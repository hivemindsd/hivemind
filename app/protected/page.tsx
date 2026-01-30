import { redirect } from 'next/navigation'

import { getCurrentServerUser } from '@/lib/supabase/server'

export default async function ProtectedPage() {
	const user = await getCurrentServerUser()
	if (!user) {
		redirect('/auth/login')
	}
}
