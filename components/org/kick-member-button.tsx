'use client'

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
import { LoaderCircle, UserRoundX } from 'lucide-react'
import { useState } from 'react'
import { useKickMember } from '@/lib/react-query/mutations'
export function KickMemberButton({ orgId, memberUserId }: { orgId: number; memberUserId: string }) {
	const [open, setOpen] = useState(false)
	const kickMemberMutation = useKickMember()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		kickMemberMutation.mutate(
			{ orgId, userId: memberUserId },
			{
				onSuccess: () => {
					setOpen(false)
				}
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='destructive'>
					Kick Member <UserRoundX />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Kick Member</DialogTitle>
					<DialogDescription>
						Are you sure you want to kick this member from the organization? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogBody>
					<div className='py-2' />
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button type='button' variant='outline' disabled={kickMemberMutation.isPending}>
							Cancel
						</Button>
					</DialogClose>
					<Button type='button' variant='destructive' onClick={handleSubmit} disabled={kickMemberMutation.isPending}>
						{kickMemberMutation.isPending ? <LoaderCircle className='animate-spin' /> : 'Kick Member'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
