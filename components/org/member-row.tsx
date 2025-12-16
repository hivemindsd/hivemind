'use client'

import { TableRow, TableCell } from '../ui/table'

type MemberRowProps = {
	userFirstName: string
	userLastName: string
	userEmail: string
	accessLevelName: string
	joinedAt: string
}

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function MemberRow({ userFirstName, userLastName, userEmail, accessLevelName, joinedAt }: MemberRowProps) {
	return (
		<TableRow>
			<TableCell>
				{capitalizeFirstLetter(userFirstName)} {capitalizeFirstLetter(userLastName)}
			</TableCell>
			<TableCell>{userEmail}</TableCell>
			<TableCell>{accessLevelName}</TableCell>
			<TableCell>{joinedAt}</TableCell>
		</TableRow>
	)
}
