'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useResestPassword } from '@/lib/react-query/auth'

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const router = useRouter()
	const resetPassword = useResestPassword()

	const passwordsMatch = password === confirmPassword
	const handleUpdatePassword = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!passwordsMatch) return
		resetPassword.mutate(
			{ password },
			{
				onSuccess: () => {
					router.push('/protected')
				}
			}
		)
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
							<div className='grid gap-2'>
								<Label htmlFor='confirm-password'>Confirm new password</Label>
								<Input
									id='confirm-password'
									type='password'
									placeholder='Confirm new password'
									required
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
								{confirmPassword.length > 0 && !passwordsMatch && (
									<p className='text-sm text-destructive'>Passwords do not match.</p>
								)}
							</div>
							<Button type='submit' className='w-full' disabled={resetPassword.isPending}>
								{resetPassword.isPending ? 'Saving...' : 'Save new password'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
