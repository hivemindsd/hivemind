'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const router = useRouter()

	const mutation = useMutation({
		mutationFn: async () => {
			if (password !== repeatPassword) {
				throw new Error('Passwords do not match')
			}

			const supabase = createClient()
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/protected`,
					data: {
						// supabase user metadata, add first and last name, done through a function on the supabase side running after sign up
						first_name: firstName.trim(),
						last_name: lastName.trim()
					}
				}
			})
			if (error) throw error
		},
		onSuccess: () => {
			router.push('/auth/sign-up-success')
		}
	})

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault()
		mutation.mutate()
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Sign up</CardTitle>
					<CardDescription>Create a new account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSignUp}>
						<div className='flex flex-col gap-6'>
							<div className='grid gap-2'>
								<Label htmlFor='first-name'>First Name</Label>
								<Input
									id='first-name'
									type='text'
									placeholder='John'
									required
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='last-name'>Last Name</Label>
								<Input
									id='last-name'
									type='text'
									placeholder='Doe'
									required
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='mail@example.com'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='grid gap-2'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Password</Label>
								</div>
								<Input
									id='password'
									type='password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className='grid gap-2'>
								<div className='flex items-center'>
									<Label htmlFor='repeat-password'>Repeat Password</Label>
								</div>
								<Input
									id='repeat-password'
									type='password'
									required
									value={repeatPassword}
									onChange={(e) => setRepeatPassword(e.target.value)}
								/>
							</div>
							<Button type='submit' className='w-full' disabled={mutation.isPending}>
								{mutation.isPending ? 'Creating an account...' : 'Sign up'}
							</Button>
						</div>
						<div className='mt-4 text-center text-sm'>
							Already have an account?{' '}
							<Link href='/auth/login' className='underline underline-offset-4'>
								Login
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
