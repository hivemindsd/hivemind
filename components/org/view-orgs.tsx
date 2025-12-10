import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OrgRow } from './org-row'

export type UserOrg = {
	org_id: number
	access_lvl: number
	orgs: {
		name: string
		org_id: number
		created_at: string
	}
}

export async function ViewOrgs() {
	const supabase = await createClient()
	const {
		data: { user },
		error: error
	} = await supabase.auth.getUser()

	if (error || !user) {
		redirect('/auth/login')
	}

	const { data: userOrgs, error: orgsError } = (await supabase
		.from('user_org_role')
		.select('org_id, access_lvl, orgs(name, org_id, created_at)')
		.eq('user_id', user.id)) as { data: UserOrg[] | null; error: any }
	if (orgsError) throw orgsError

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
								createdAt={userOrg.orgs.created_at}
							/>
						)
					})
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
