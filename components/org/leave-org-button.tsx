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
import { LoaderCircle, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useLeaveOrg } from '@/lib/react-query/mutations'
import { useCurrentClientUser } from '@/lib/react-query/auth'

export function LeaveOrgButton({ orgId }: { orgId: number }) {
	const [open, setOpen] = useState(false)
	const { data: user } = useCurrentClientUser()
	const leaveOrgMutation = useLeaveOrg()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!user?.id) return

		leaveOrgMutation.mutate(
			{ orgId, userId: user.id },
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
					Leave Organization <LogOut />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Leave Organization</DialogTitle>
					<DialogDescription>
						Are you sure you want to leave this organization? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogBody>
					<div className='py-2' />
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button type='button' variant='outline' disabled={leaveOrgMutation.isPending}>
							Cancel
						</Button>
					</DialogClose>
					<Button
						type='button'
						variant='destructive'
						onClick={handleSubmit}
						disabled={leaveOrgMutation.isPending || !user}
					>
						{leaveOrgMutation.isPending ? <LoaderCircle className='animate-spin' /> : 'Leave Organization'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
