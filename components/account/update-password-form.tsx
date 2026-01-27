'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const [password, setPassword] = useState('')
	const router = useRouter()

	const mutation = useMutation({
		mutationFn: async () => {
			const supabase = createClient()
			const { error } = await supabase.auth.updateUser({ password })
			if (error) throw error
		},
		onSuccess: () => {
			router.push('/protected')
		}
	})

	const handleUpdatePassword = async (e: React.FormEvent) => {
		e.preventDefault()
		mutation.mutate()
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Reset Your Password</CardTitle>
					<CardDescription>Please enter your new password below.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleUpdatePassword}>
						<div className='flex flex-col gap-6'>
							<div className='grid gap-2'>
								<Label htmlFor='password'>New password</Label>
								<Input
									id='password'
									type='password'
									placeholder='New password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<Button type='submit' className='w-full' disabled={mutation.isPending}>
								{mutation.isPending ? 'Saving...' : 'Save new password'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
