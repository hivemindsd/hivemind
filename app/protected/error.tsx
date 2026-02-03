'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { redirect } from 'next/navigation'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className='fixed inset-0 z-50 flex min-h-[400px] w-full items-center justify-center bg-background p-6'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-2xl'>Something went wrong</CardTitle>
					<CardDescription>An error occurred while loading this page</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<p className='text-sm text-muted-foreground'>{error.message}</p>
					<Button onClick={reset} className='w-full'>
						Try again
					</Button>
					<Button onClick={() => redirect('/protected')} variant='destructive' className='w-full'>
						Back to Home
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
