'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog-to-drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoaderCircle } from 'lucide-react'
import { useResestPassword } from '@/lib/react-query/auth'

type UpdatePasswordButtonProps = {
	defaultOpen?: boolean
	showTrigger?: boolean
	onSuccess?: () => void
}

export function UpdatePasswordButton({
	defaultOpen = false,
	showTrigger = true,
	onSuccess
}: UpdatePasswordButtonProps) {
	const [open, setOpen] = useState(defaultOpen)
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const resetPassword = useResestPassword()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (password !== confirmPassword) return
		resetPassword.mutate(
			{ password },
			{
				onSuccess: () => {
					setOpen(false)
					setPassword('')
					setConfirmPassword('')
					onSuccess?.()
				}
			}
		)
	}

	const passwordsMatch = password === confirmPassword

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{showTrigger && (
				<DialogTrigger asChild>
					<Button className='w-fit'>Update password</Button>
				</DialogTrigger>
			)}
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Reset your password</DialogTitle>
						<DialogDescription>Enter a new password for your account.</DialogDescription>
					</DialogHeader>
					<DialogBody>
						<div className='grid gap-4 py-4'>
							<div className='grid gap-2'>
								<Label htmlFor='password'>New password</Label>
								<Input
									id='password'
									type='password'
									placeholder='New password'
									required
									disabled={resetPassword.isPending}
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
									disabled={resetPassword.isPending}
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
								{confirmPassword.length > 0 && !passwordsMatch && (
									<p className='text-sm text-destructive'>Passwords do not match.</p>
								)}
							</div>
						</div>
					</DialogBody>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='outline' disabled={resetPassword.isPending}>
								Cancel
							</Button>
						</DialogClose>
						<Button type='submit' disabled={resetPassword.isPending || !passwordsMatch}>
							{resetPassword.isPending ? <LoaderCircle className='animate-spin' /> : 'Save new password'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
