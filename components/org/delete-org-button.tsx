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
import { TrashIcon, LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDeleteOrg } from '@/lib/react-query/mutations'
import { useCurrentClientUser } from '@/lib/react-query/auth'

export function DeleteOrgButton() {
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const params = useParams()
	const orgId = params?.orgId as number | undefined
	const { data: user } = useCurrentClientUser()
	const deleteOrgMutation = useDeleteOrg()

	const handleDelete = async () => {
		deleteOrgMutation.mutate(
			{ orgId: orgId as number, userId: user?.id as string },
			{
				onSuccess: () => {
					router.push('/protected/orgs')
				}
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='destructive'>
					Delete Organization <TrashIcon className='w-4 h-4' />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Organization</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this organization? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogBody>
					<div className='py-2' />
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button type='button' variant='outline' disabled={deleteOrgMutation.isPending}>
							Cancel
						</Button>
					</DialogClose>
					<Button
						type='button'
						variant='destructive'
						onClick={handleDelete}
						disabled={deleteOrgMutation.isPending || !user}
					>
						{deleteOrgMutation.isPending ? <LoaderCircle className='animate-spin' /> : 'Delete Organization'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
