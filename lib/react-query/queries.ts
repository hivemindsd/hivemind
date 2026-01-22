import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { PostgrestError } from '@supabase/supabase-js'
import { UUID } from 'crypto'

export type UserOrg = {
	org_id: number
	access_lvl: number
	orgs: {
		name: string
		org_id: number
		created_at: string
	}
}

export type OrgMember = {
	user_id: string
	access_lvl: number
	created_at: string
}

export type MemberProfile = {
	id: UUID
	first_name: string
	last_name: string
	email: string
	full_name: string
}

export function useUserOrgs(userId: string) {
	return useQuery({
		queryKey: ['orgs', userId],
		queryFn: async () => {
			const supabase = createClient()
			const { data, error } = (await supabase
				.from('user_org_role')
				.select('org_id, access_lvl, orgs(name, org_id, created_at)')
				.eq('user_id', userId)) as { data: UserOrg[] | null; error: PostgrestError | null }

			if (error) throw error
			return data
		},
		enabled: !!userId
	})
}

export function useOrgMembers(orgId: number) {
	return useQuery({
		queryKey: ['orgMembers', orgId],
		queryFn: async () => {
			const supabase = createClient()
			const { data, error } = (await supabase
				.from('user_org_role')
				.select('user_id, access_lvl, created_at')
				.eq('org_id', orgId)
				.order('created_at', { ascending: true })) as { data: OrgMember[] | null; error: PostgrestError | null }

			if (error) throw error
			return data
		},
		enabled: !!orgId
	})
}

export function useMemberProfiles(userIds: string[]) {
	return useQuery({
		queryKey: ['profiles', userIds],
		queryFn: async () => {
			const supabase = createClient()
			const { data, error } = (await supabase
				.from('profiles')
				.select('id, first_name, last_name, email, full_name')
				.in('id', userIds)) as { data: MemberProfile[] | null; error: PostgrestError | null }

			if (error) throw error
			return data
		},
		enabled: userIds.length > 0
	})
}
