'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ProtectedNavHomeLink() {
	const pathname = usePathname()
	const match = pathname?.match(/^\/protected\/orgs\/(\d+)/)
	const orgId = match?.[1]
	const href = orgId ? `/protected/orgs/${orgId}` : '/protected/orgs'

	return (
		<Link href={href} className='pl-7 ml-2 font-dancing-script text-4xl font-bold'>
			Hivemind
		</Link>
	)
}
