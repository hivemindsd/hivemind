import { getCurrentServerUser } from '@/lib/supabase/server'

export default async function Page() {
	const user = await getCurrentServerUser()

	return (
		<div className='space-y-4 w-full justify-center items-center'>
			<div className='flex-col mx-auto max-w-5xl'>
				<div className='pb-5 flex-row flex items-center justify-between'>
					<div className='flex-col'>
						<h1 className='text-2xl font-semibold'>Account page for user = {user?.email ?? user?.id ?? 'unknown'}</h1>
					</div>
				</div>
			</div>
		</div>
	)
}
