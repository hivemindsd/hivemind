'use client'

import { TableRow, TableCell } from '../ui/table'

type MemberRowProps = {
	userEmail: string
	accessLevelName: string
	joinedAt: string
}

export function MemberRow({ userEmail, accessLevelName, joinedAt }: MemberRowProps) {
	return (
		<TableRow>
			<TableCell>{userEmail}</TableCell>
			<TableCell>{accessLevelName}</TableCell>
			<TableCell>{new Date(joinedAt).toLocaleDateString()}</TableCell>
		</TableRow>
	)
}
