import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

type OrgLayoutProps = {
	children: React.ReactNode
	params: Promise<{ orgId: string }>
}

export default async function OrgLayout({ children, params }: OrgLayoutProps) {
	const { orgId } = await params

	const supabase = await createClient()

	const {
		data: { user },
		error: userError
	} = await supabase.auth.getUser()

	if (userError || !user) {
		redirect('/auth/login')
	}

	const { data: membership, error: membershipError } = await supabase
		.from('user_org_role')
		.select('user_id')
		.eq('user_id', user.id)
		.eq('org_id', orgId)
		.maybeSingle()

	if (membershipError || !membership) {
		throw new Error('You do not have access to this organization') // thrown and caught by protected/error.tsx
	}

	return children
}
