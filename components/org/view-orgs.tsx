'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrgRow } from './org-row'
import { useUserOrgs, type UserOrg } from '@/lib/react-query/queries'
import { useCurrentClientUser } from '@/lib/react-query/auth'
import { PendingInvites } from './view-pending-invites'
import { LoaderCircle } from 'lucide-react'

export function ViewOrgs() {
	const { data: user } = useCurrentClientUser()
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

	return (
		<>
			<div className='mb-4 flex flex-col mx-auto'>
				<PendingInvites />
			</div>
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
								<OrgRow key={userOrg.orgs.org_id} {...userOrg} />
							)
						})
					) : isLoading ? (
						<TableRow>
							<TableCell colSpan={3} className='text-center text-muted-foreground'>
								<div className='flex justify-center items-center py-4'>
									<LoaderCircle className='animate-spin' />
								</div>
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
		</>
	)
}
