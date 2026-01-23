import { OrgSettings } from '@/components/org/orgs-settings'

type PageProps = {
	params: Promise<{
		orgId: number
	}>
}

export default async function Page({ params }: PageProps) {
	const { orgId } = await params

	return (
		<div className='space-y-4 w-full justify-center items-center'>
			<div className='flex-col mx-auto max-w-5xl'>
				<div className='pb-5'>
					<h1 className='text-2xl font-semibold'>Homepage (aka per organization Dashboard)</h1>
				</div>
				<OrgSettings orgId={orgId} />
			</div>
		</div>
	)
}
