'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrgRow } from './org-row'
import { useUserOrgs, type UserOrg } from '@/lib/react-query/queries'
import { useCurrentUser } from '@/lib/react-query/auth'

export function ViewOrgs() {
	const { data: user } = useCurrentUser()
	const { data: userOrgs, isLoading } = useUserOrgs(user?.id || '')

	// returns an object:

	// UserOrgs {
	//	  org_id: 6,
	//	  access_lvl: 3,
	//	  orgs: {
	//		 name: 'omran's org',
	//		 org_id: 6,
	//		 created_at: '2025-11-29T20:42:41.324275+00:00' <--- supabase is returning the date as a string
	//	  }
	// }

	// placeholder while we figure out exact access level names
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
					<TableHead>Name</TableHead>
					<TableHead>Access level</TableHead>
					<TableHead>Created</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{userOrgs && userOrgs.length > 0 ? (
					userOrgs.map((userOrg: UserOrg) => {
						return (
							// OrgRow component is specifically client rendered, otherwise a server rendered component would be used and the onClick would not work
							<OrgRow
								key={userOrg.org_id}
								orgId={userOrg.org_id}
								name={userOrg.orgs.name}
								accessLevelName={getAccessLevelName(userOrg.access_lvl)}
								createdAt={new Date(userOrg.orgs.created_at).toLocaleDateString()}
							/>
						)
					})
				) : isLoading ? (
					<TableRow>
						<TableCell colSpan={3} className='text-center text-muted-foreground'>
							Loading...
						</TableCell>
					</TableRow>
				) : (
					<TableRow>
						<TableCell colSpan={3} className='text-center text-muted-foreground'>
							No organizations found
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
