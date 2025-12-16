import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MemberRow } from '@/components/org/member-row'
import { createClient } from '@/lib/supabase/client'
import type { PostgrestError } from '@supabase/supabase-js'
import { UUID } from 'crypto'

type ViewOrgMembersProps = {
	orgId: number
}

type OrgMember = {
	user_id: string
	access_lvl: number
	created_at: string
}

type MemberProfile = {
	id: UUID
	first_name: string
	last_name: string
	email: string
	full_name: string
}

export async function ViewOrgMembers({ orgId }: ViewOrgMembersProps) {
	const supabase = await createClient()

	const { data: members, error: membersError } = (await supabase
		.from('user_org_role')
		.select('user_id, access_lvl, created_at')
		.eq('org_id', orgId)
		.order('created_at', { ascending: true })) as { data: OrgMember[] | null; error: PostgrestError | null }
	if (membersError) throw membersError

	const userIds = members?.map((member) => member.user_id) ?? []

	const { data: memberProfiles, error: memberProfilesError } = (await supabase
		.from('profiles')
		.select('id, first_name, last_name, email, full_name')
		.in('id', userIds)) as { data: MemberProfile[] | null; error: PostgrestError | null }
	if (memberProfilesError) throw memberProfilesError

	function getAccessLevelName(accessLevel: number) {
		switch (accessLevel) {
			case 1:
				return 'Caretaker'
			case 2:
				return 'Admin'
			case 3:
				return 'Owner'
			default:
				return 'Super Admin'
		}
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Member Name</TableHead>
					<TableHead>Member Email</TableHead>
					<TableHead>Access level</TableHead>
					<TableHead>Joined</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{memberProfiles && memberProfiles.length > 0 ? (
					memberProfiles.map((user: MemberProfile) => (
						<MemberRow
							key={user.id}
							userFirstName={user.first_name}
							userLastName={user.last_name}
							userEmail={user.email}
							accessLevelName={getAccessLevelName(
								members?.find((member) => member.user_id === user.id)?.access_lvl || 0
							)}
							joinedAt={new Date(
								members?.find((member) => member.user_id === user.id)?.created_at || ''
							).toLocaleDateString()}
						/>
					))
				) : (
					<TableRow>
						<TableCell colSpan={4} className='text-center text-muted-foreground'>
							No members found for this organization
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
