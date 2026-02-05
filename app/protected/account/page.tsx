import { createClient } from '@/lib/supabase/server'
import { UpdatePasswordButton } from '@/components/account/update-password-button'

export default async function Page() {
	const supabase = await createClient()

	// You can also use getUser() which will be slower.
	const { data } = await supabase.auth.getClaims()

	const user = data?.claims

	return (
		<div className='space-y-6 w-full justify-center items-center'>
			<div className='flex-col mx-auto max-w-5xl'>
				<div className='pb-5 flex-row flex items-center justify-between'>
					<div className='flex-col'>
						<h1 className='text-2xl font-semibold'>Account page for user = {user?.email ?? user?.id ?? 'unknown'}</h1>
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					<p className='text-sm text-muted-foreground'>Manage your account settings and security.</p>
					<UpdatePasswordButton />
				</div>
			</div>
		</div>
	)
}
