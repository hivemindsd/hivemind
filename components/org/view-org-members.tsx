'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MemberRow } from '@/components/org/member-row'
import { useOrgMembers, useMemberProfiles } from '@/lib/react-query/queries'
import getAccessLevelName from '@/context/access-levels'
import { LoaderCircle } from 'lucide-react'

export function ViewOrgMembers({ orgId }: { orgId: number }) {
	const { data: orgMembers, isLoading: orgMembersLoading } = useOrgMembers(orgId)
	const userIds = orgMembers?.map((user) => user.user_id) ?? []
	const { data: memberProfiles, isLoading: profilesLoading } = useMemberProfiles(userIds)

	const isLoading = orgMembersLoading || profilesLoading

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
				{isLoading ? (
					<TableRow>
						<TableCell colSpan={4} className='text-center text-muted-foreground'>
							<div className='flex justify-center items-center py-4'>
								<LoaderCircle className='animate-spin' />
							</div>
						</TableCell>
					</TableRow>
				) : memberProfiles && memberProfiles.length > 0 ? (
					memberProfiles.map((user) => (
						<MemberRow
							key={user.id}
							userFirstName={user.first_name}
							userLastName={user.last_name}
							userEmail={user.email}
							accessLevelName={getAccessLevelName(
								orgMembers?.find((member) => member.user_id === user.id)?.access_lvl || 0
							)}
							joinedAt={new Date(
								orgMembers?.find((member) => member.user_id === user.id)?.created_at || ''
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
