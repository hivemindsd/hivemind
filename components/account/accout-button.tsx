'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function AccountButton() {
	const router = useRouter()

	return (
		<Button variant='default' size='sm' className='w-auto px-4' onClick={() => router.push('/protected/account')}>
			Account
		</Button>
	)
}
