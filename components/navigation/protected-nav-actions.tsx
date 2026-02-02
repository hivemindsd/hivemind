'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AccountButton } from '@/components/account/accout-button'
import { LogoutButton } from '@/components/account/logout-button'

function isOrgRoute(pathname: string | null) {
	if (!pathname) return false
	return /^\/protected\/orgs\/\d+/.test(pathname)
}

export function ProtectedNavActions() {
	const pathname = usePathname()
	const [isAuthed, setIsAuthed] = useState(false)

	useEffect(() => {
		let isMounted = true
		const supabase = createClient()
		;(async () => {
			const { data, error } = await supabase.auth.getClaims()
			if (!isMounted) return
			if (error || !data?.claims) {
				setIsAuthed(false)
				return
			}
			setIsAuthed(true)
		})()

		return () => {
			isMounted = false
		}
	}, [])

	if (isOrgRoute(pathname) || !isAuthed) {
		return null
	}

	return (
		<div className='flex items-center flex-row justify-end gap-2 max-w-full'>
			<AccountButton />
			<LogoutButton />
		</div>
	)
}
