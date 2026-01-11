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
import { createClient } from '@/lib/supabase/client'
import { LoaderCircle, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LeaveOrgButton({ orgId }: { orgId: number }) {
	const [open, setOpen] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const supabase = createClient()
		setIsLoading(true)
		setError(null)

		try {
			// get the current user
			const {
				data: { user },
				error: userError
			} = await supabase.auth.getUser()
			if (userError || !user) throw userError

			// delete the user_org_role relationship
			const { error: relationError } = await supabase
				.from('user_org_role')
				.delete()
				.eq('org_id', orgId)
				.eq('user_id', user.id)

			if (relationError) {
				throw relationError
			}

			// close dialog and refresh
			router.refresh()
			setOpen(false)
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'Failed to leave organization')
		} finally {
			setIsLoading(false)
		}
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
				{error && <p className='text-sm text-red-500'>{error}</p>}
				<DialogFooter>
					<Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button type='button' variant='destructive' onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? <LoaderCircle className='animate-spin' /> : 'Leave Organization'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
