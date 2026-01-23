'use client'

import { DeleteOrgButton } from '@/components/org/delete-org-button'
import { ViewOrgMembers } from '@/components/org/view-org-members'
import { useCurrentUser } from '@/lib/react-query/auth'
import { useOrgMembers } from '@/lib/react-query/queries'

type OrgSettingsProps = {
	orgId: number
}

export function OrgSettings({ orgId }: OrgSettingsProps) {
	const { data: user } = useCurrentUser()
	const { data: orgMembers, isLoading } = useOrgMembers(orgId)
	const isOwner = orgMembers?.some((member) => member.user_id === user?.id && member.access_lvl === 3)

	if (isLoading) return null

	return (
		<div className='space-y-4'>
			{isOwner && <DeleteOrgButton />}
			<ViewOrgMembers orgId={orgId} />
		</div>
	)
}
