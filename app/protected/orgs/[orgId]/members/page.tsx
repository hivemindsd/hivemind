import { ViewOrgMembers } from '@/components/org/view-org-members'
import { ViewSentInvites } from '@/components/org/view-sent-invites'
import { InviteMemberButton } from '@/components/org/invite-org-button'

export default async function Page({ params }: { params: Promise<{ orgId: string }> }) {
	const { orgId } = await params

	return (
		<div className='space-y-4 w-full justify-center items-center'>
			<div className='flex-col mx-auto max-w-5xl flex gap-4'>
				<div className='pb-5'>
					<h1 className='text-2xl font-semibold'>Members of org = {orgId}</h1>
				</div>
				<InviteMemberButton />
				<ViewSentInvites />
				<ViewOrgMembers />
			</div>
		</div>
	)
}
