import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useDeposit() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ network, amount, txHash }: { network: string, amount: number, txHash: string }) => {
      if (!user) throw new Error('User not authenticated');

      // 1. Duplicate Prevention: Check if this TxHash has been used before
      const { data: existingTx } = await supabase
        .from('deposits')
        .select('id')
        .eq('tx_hash', txHash)
        .maybeSingle();

      if (existingTx) {
        throw new Error('This transaction hash has already been processed or is under review.');
      }

      // 2. Insert deposit record
      const { data: deposit, error: depositError } = await supabase
        .from('deposits')
        .insert({
          user_id: user.id,
          network: network,
          amount: amount,
          tx_hash: txHash,
          status: 'confirmed' 
        })
        .select()
        .single();

      if (depositError) throw depositError;

      // 3. Reconcile Balance
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_balance')
        .eq('id', user.id)
        .single();

      const currentBalance = profile?.total_balance || 0;
      const newBalance = currentBalance + amount;

      // 4. Update or Create profile with new balance
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id,
          total_balance: newBalance,
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      return deposit;
    },
    onSuccess: () => {
      // Force immediate global cache invalidation for real-time balance update
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['deposits', user?.id] });
    },
  });
}
