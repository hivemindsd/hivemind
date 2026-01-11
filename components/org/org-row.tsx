'use client'

import { useRouter } from 'next/navigation'
import { TableRow, TableCell } from '../ui/table'
import { Button } from '../ui/button'
import { EyeIcon, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { LeaveOrgButton } from './leave-org-button'

type OrgRowProps = {
	orgId: number
	name: string
	accessLevelName: string
	createdAt: string
}

export function OrgRow({ orgId, name, accessLevelName, createdAt }: OrgRowProps) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	return (
		<TableRow>
			<TableCell>{name}</TableCell>
			<TableCell>{accessLevelName}</TableCell>
			<TableCell>{createdAt}</TableCell>
			<TableCell className='flex'>
				<Button
					onClick={() => {
						setIsLoading(true)
						router.push(`/protected/home/${orgId}`)
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
				<LeaveOrgButton orgId={orgId} />
			</TableCell>
		</TableRow>
	)
}
