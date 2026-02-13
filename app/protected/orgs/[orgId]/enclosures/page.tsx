import { CreateEnclosureButton } from '@/components/enclosures/create-enclosure-button'
import { EnclosureGrid } from '@/components/enclosures/enclosures-grid'

export default async function Page({ params }: { params: Promise<{ orgId: number }> }) {
	const { orgId } = await params

	return (
		<div className='space-y-6 w-full justify-center items-center'>
			<div className='flex-col mx-auto max-w-5xl'>
				<div className='pb-5 flex-row flex items-center justify-between'>
					<div className='flex-col'>
						<div className='flex flex-row mb-2 justify-between'>
							<h1 className='text-2xl font-semibold grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]'>
								Enclosures for org = {orgId}
							</h1>
							<CreateEnclosureButton orgId={orgId} />
						</div>
						<EnclosureGrid orgId={orgId} />
					</div>
				</div>
				<div className='flex flex-col gap-4 text-center'>
					<p className='text-sm text-muted-foreground'>Manage your organization&apos;s enclosures.</p>
				</div>
			</div>
		</div>
	)
}
