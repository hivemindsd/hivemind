import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

// Auth query keys
export const authKeys = {
	currentUser: ['auth', 'currentUser'] as const
}

// Hook to get the current authenticated user
export function useCurrentUser() {
	return useQuery({
		queryKey: authKeys.currentUser,
		queryFn: async (): Promise<User | null> => {
			const supabase = createClient()
			const {
				data: { user },
				error
			} = await supabase.auth.getUser()

			if (error) throw error
			return user
		},
		staleTime: 5 * 60 * 1000, // 5 minutes - user data doesn't change often
		retry: false // Don't retry if user is not authenticated
	})
}
