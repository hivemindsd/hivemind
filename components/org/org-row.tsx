'use client'

import { useRouter } from 'next/navigation'
import { TableRow, TableCell } from '../ui/table'
import { Button } from '../ui/button'
import { EyeIcon, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { LeaveOrgButton } from './leave-org-button'
import type { UserOrg } from '@/lib/react-query/queries'

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

export function OrgRow(userOrg: UserOrg) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	return (
		<TableRow>
			<TableCell>{userOrg.orgs.name}</TableCell>
			<TableCell>{getAccessLevelName(userOrg.access_lvl)}</TableCell>
			<TableCell>{new Date(userOrg.orgs.created_at).toLocaleDateString()}</TableCell>
			<TableCell className='flex'>
				<Button
					onClick={() => {
						setIsLoading(true)
						router.push(`/protected/home/${userOrg.orgs.org_id}`)
					}}
					disabled={isLoading}
				>
					{isLoading ? (
						<LoaderCircle className='animate-spin' />
					) : (
						<>
							View <EyeIcon className='w-4 h-4' />
						</>
					)}
				</Button>
			</TableCell>
			<TableCell>
				<LeaveOrgButton orgId={userOrg.orgs.org_id} />
			</TableCell>
		</TableRow>
	)
}
