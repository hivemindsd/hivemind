'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function ProtectedNavHomeLink() {
	const pathname = usePathname()
	const match = pathname?.match(/^\/protected\/orgs\/(\d+)/)
	const orgId = match?.[1]
	const href = orgId ? `/protected/orgs/${orgId}` : '/protected/orgs'
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<Link href={href} className='pl-12 md:pl-7 ml-0 md:ml-2 font-dancing-script text-2xl md:text-4xl font-bold'>
			Hivemind
		</Link>
	)
}
