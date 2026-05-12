import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useUser() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error;
      
      const metadata = user.user_metadata || {};
      const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`;

      return {
        id: user.id,
        email: user.email,
        full_name: data?.full_name || metadata.full_name || 'Anonymous User',
        avatar_url: data?.avatar_url || metadata.avatar_url || metadata.picture || defaultAvatar,
        total_balance: data?.total_balance || 0,
        ...data
      };
    },
    enabled: !!user,
  });
}
