'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useUpdateProfile } from '@/lib/react-query/mutations'
import { useCurrentUser } from '@/lib/react-query/auth'

export function ProfileSetup({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const router = useRouter()
	const { data: user } = useCurrentUser()
	const updateProfileMutation = useUpdateProfile()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!firstName.trim() || !lastName.trim() || !user?.id) {
			return
		}

		updateProfileMutation.mutate(
			{ userId: user.id, firstName, lastName },
			{
				onSuccess: () => {
					router.push('/protected/orgs/')
				}
			}
		)
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
							<Button type='submit' className='w-full' disabled={updateProfileMutation.isPending || !user}>
								{updateProfileMutation.isPending ? 'Saving...' : 'Save'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
