'use client'

import { useRouter } from 'next/navigation'
import { TableRow, TableCell } from '../ui/table'
import { Button } from '../ui/button'
import { EyeIcon } from 'lucide-react'

type OrgRowProps = {
	orgId: number
	name: string
	accessLevelName: string
	createdAt: string
}

export function OrgRow({ orgId, name, accessLevelName, createdAt }: OrgRowProps) {
	const router = useRouter()

	return (
		<TableRow>
			<TableCell>{name}</TableCell>
			<TableCell>{accessLevelName}</TableCell>
			<TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
			<TableCell className='flex'>
				<Button onClick={() => router.push(`/protected/home/${orgId}`)}>
					View
					<EyeIcon className='w-4 h-4' />
				</Button>
			</TableCell>
		</TableRow>
	)
}
