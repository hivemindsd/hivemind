'use client'

import { DeleteOrgButton } from '@/components/org/delete-org-button'
import { useCurrentClientUser } from '@/lib/react-query/auth'
import { useOrgMembers } from '@/lib/react-query/queries'

import { useParams } from 'next/navigation'

export function OrgSettings() {
	const params = useParams()
	const orgId = Number(params.orgId)
	const { data: user } = useCurrentClientUser()
	const { data: orgMembers, isLoading } = useOrgMembers(orgId)
	const isOwner = orgMembers?.some((member) => member.user_id === user?.id && member.access_lvl === 3)

	if (isLoading) return null

	return (
		<div className='space-y-4'>
			{isOwner && (
				<>
					<div className='gap-2 flex'>
						<DeleteOrgButton />
					</div>
				</>
			)}
		</div>
	)
}
