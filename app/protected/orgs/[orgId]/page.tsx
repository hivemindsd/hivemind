import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default async function Page({ params }: { params: Promise<{ orgId: string }> }) {
	const { orgId } = await params
	return (
		<div className='space-y-4 w-full justify-center items-center'>
			<div className='flex-col mx-auto max-w-5xl'>
				<div className='pb-5'>
					<h1 className='text-2xl font-semibold'>
						Dashboard page for org id = {orgId}. We will make the dashboard stuff later.
					</h1>
				</div>
				<Button asChild>
					<Link href={`/protected/orgs/${orgId}/settings`}>Settings</Link>
				</Button>
			</div>
		</div>
	)
}
