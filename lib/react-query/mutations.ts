import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

export function useCreateOrg() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ name, userId }: { name: string; userId: string }) => {
			const supabase = createClient()

			// Insert the organization
			const { data: org, error: orgError } = await supabase.from('orgs').insert({ name: name.trim() }).select().single()

			if (orgError) throw orgError

			// Update the user_org_role table with proper access level
			const { error: relationError } = await supabase.from('user_org_role').insert({
				user_id: userId,
				org_id: org.org_id,
				access_lvl: 3
			})

			if (relationError) {
				// If we fail to update the user_org_role table, delete the org
				await supabase.from('orgs').delete().eq('org_id', org.org_id)
				throw relationError
			}

			return org
		},
		onSuccess: (data, variables) => {
			// Invalidate and refetch user orgs
			queryClient.invalidateQueries({ queryKey: ['orgs', variables.userId] })
		}
	})
}

export function useDeleteOrg() {
	const queryClient = useQueryClient()

	return useMutation({
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mutationFn: async ({ orgId, userId }: { orgId: number; userId: string }) => {
			const supabase = createClient()

			// Delete user_org_role relationships
			const { error: relationError } = await supabase.from('user_org_role').delete().eq('org_id', orgId)
			if (relationError) throw relationError

			// Delete the organization
			const { error: orgError } = await supabase.from('orgs').delete().eq('org_id', orgId)
			if (orgError) throw orgError

			return { orgId }
		},
		onSuccess: (data, variables) => {
			// Invalidate and refetch user orgs
			queryClient.invalidateQueries({ queryKey: ['orgs', variables.userId] })
		}
	})
}

export function useLeaveOrg() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ orgId, userId }: { orgId: number; userId: string }) => {
			const supabase = createClient()

			const { error } = await supabase.from('user_org_role').delete().eq('org_id', orgId).eq('user_id', userId)
			if (error) throw error

			return { orgId }
		},
		onSuccess: (data, variables) => {
			// Invalidate and refetch user orgs
			queryClient.invalidateQueries({ queryKey: ['orgs', variables.userId] })
		}
	})
}

export function useUpdateProfile() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ userId, firstName, lastName }: { userId: string; firstName: string; lastName: string }) => {
			const supabase = createClient()

			const { data, error } = await supabase
				.from('profiles')
				.update({ first_name: firstName.trim(), last_name: lastName.trim() })
				.eq('id', userId)
				.select()
				.single()

			if (error) throw error
			return data
		},
		onSuccess: () => {
			// Invalidate profile queries
			queryClient.invalidateQueries({ queryKey: ['profiles'] })
		}
	})
}
