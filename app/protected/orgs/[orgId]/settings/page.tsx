import { OrgSettings } from '@/components/org/orgs-settings'

export default async function Page({ params }: { params: Promise<{ orgId: string }> }) {
	const { orgId } = await params

	return (
		<div className='space-y-4 w-full justify-center items-center'>
			<div className='flex-col mx-auto max-w-5xl'>
				<div className='pb-5'>
					<h1 className='text-2xl font-semibold'>Organization settings for org = {orgId}</h1>
				</div>
				<div className='flex flex-col gap-4'>
					<p className='text-sm text-muted-foreground'>Manage your organizationn&apos;s settings</p>
					<OrgSettings />
				</div>
			</div>
		</div>
	)
}
