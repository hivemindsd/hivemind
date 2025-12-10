import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MemberRow } from '@/components/org/member-row'
import { createClient } from '@/lib/supabase/client'
import type { PostgrestError } from '@supabase/supabase-js'

type ViewOrgMembersProps = {
	orgId: number
}

type OrgMember = {
	user_id: string
	access_lvl: number
	created_at: string
}

export async function ViewOrgMembers({ orgId }: ViewOrgMembersProps) {
	const supabase = await createClient()

	//TODO: actually get the user emails too, not just the ID's
	const { data: members, error: membersError } = await (supabase
		.from('user_org_role')
		.select('user_id, access_lvl, created_at')
		.eq('org_id', orgId)
		.order('created_at', { ascending: true })) as { data: OrgMember[] | null; error: PostgrestError | null }
	if (membersError) throw membersError

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
					<TableHead>Member Email</TableHead>
					<TableHead>Access level</TableHead>
					<TableHead>Joined</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{members && members.length > 0 ? (
					members.map((member: OrgMember) => (
						<MemberRow
							key={member.user_id}
							userEmail={'email string... TODO'}
							accessLevelName={getAccessLevelName(member.access_lvl)}
							joinedAt={member.created_at}
						/>
					))
				) : (
					<TableRow>
						<TableCell colSpan={3} className='text-center text-muted-foreground'>
							No members found for this organization
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
