import { OrgSettings } from '@/components/org/orgs-settings'

export default async function Page() {
	return (
		<div className='space-y-4 w-full justify-center items-center'>
			<div className='flex-col mx-auto max-w-5xl'>
				<div className='pb-5'>
					<h1 className='text-2xl font-semibold'>Homepage (aka per organization Dashboard)</h1>
				</div>
				<OrgSettings />
			</div>
		</div>
	)
}
