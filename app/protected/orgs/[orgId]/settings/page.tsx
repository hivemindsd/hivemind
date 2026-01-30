import { OrgSettings } from '@/components/org/orgs-settings'

export default async function Page({ params }: { params: Promise<{ orgId: string }> }) {
	const { orgId } = await params

	return (
		<div className='space-y-4 w-full justify-center items-center'>
			<div className='flex-col mx-auto max-w-5xl'>
				<div className='pb-5'>
					<h1 className='text-2xl font-semibold'>Organization settings for org = {orgId}</h1>
				</div>
				<OrgSettings />
			</div>
		</div>
	)
}
