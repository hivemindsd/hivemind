export default async function Page({ params }: { params: Promise<{ orgId: string }> }) {
	const { orgId } = await params

	return (
		<div className='space-y-6 w-full justify-center items-center'>
			<div className='flex-col mx-auto max-w-5xl'>
				<div className='pb-5 flex-row flex items-center justify-between'>
					<div className='flex-col'>
						<h1 className='text-2xl font-semibold'>Show all enclosures for org = {orgId}</h1>
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					<p className='text-sm text-muted-foreground'>Manage your organization&apos;s enclosures.</p>
				</div>
			</div>
		</div>
	)
}
