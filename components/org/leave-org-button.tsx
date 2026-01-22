'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { LoaderCircle, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLeaveOrg } from '@/lib/react-query/mutations'
import { useCurrentUser } from '@/lib/react-query/auth'

export function LeaveOrgButton({ orgId }: { orgId: number }) {
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const { data: user } = useCurrentUser()
	const leaveOrgMutation = useLeaveOrg()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!user?.id) return

		leaveOrgMutation.mutate(
			{ orgId, userId: user.id },
			{
				onSuccess: () => {
					setOpen(false)
					router.refresh()
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
				<DialogFooter>
					<Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={leaveOrgMutation.isPending}>
						Cancel
					</Button>
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
