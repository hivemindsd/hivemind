'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function ProfileSetup({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState<string | null>(null)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)
		setSuccess(null)

		if (!firstName.trim() || !lastName.trim()) {
			setError('Please provide both your first and last name')
			setIsLoading(false)
			return
		}

		try {
			const supabase = createClient()

			const {
				data: { user },
				error: userError
			} = await supabase.auth.getUser()

			if (userError || !user) {
				throw new Error('User not authenticated')
			}

			const { error: updateError } = await supabase
				.from('profiles')
				.update({ first_name: firstName.trim(), last_name: lastName.trim() })
				.eq('id', user.id)

			if (updateError) throw updateError

			setSuccess('Profile updated')
			router.push('/protected/orgs/')
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Profile setup</CardTitle>
					<CardDescription>Tell us your name</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className='flex flex-col gap-6'>
							<div className='grid gap-2'>
								<Label htmlFor='first-name'>First name</Label>
								<Input
									id='first-name'
									type='text'
									placeholder='First name'
									required
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='last-name'>Last name</Label>
								<Input
									id='last-name'
									type='text'
									placeholder='Last name'
									required
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							{error && <p className='text-sm text-red-500'>{error}</p>}
							{success && <p className='text-sm text-green-600'>{success}</p>}
							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading ? 'Saving...' : 'Save'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
