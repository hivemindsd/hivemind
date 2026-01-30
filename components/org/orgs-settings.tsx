'use client'

import { DeleteOrgButton } from '@/components/org/delete-org-button'
import { ViewOrgMembers } from '@/components/org/view-org-members'
import { useCurrentClientUser } from '@/lib/react-query/auth'
import { useOrgMembers } from '@/lib/react-query/queries'
import { InviteMemberButton } from '@/components/org/invite-org-button'
import { ViewSentInvites } from './view-sent-invites'

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
						<InviteMemberButton orgId={orgId} />
					</div>
					<ViewSentInvites orgId={orgId} />
				</>
			)}
			<ViewOrgMembers orgId={orgId} />
		</div>
	)
}
