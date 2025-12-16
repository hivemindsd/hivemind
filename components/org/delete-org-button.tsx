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
import { TrashIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export function DeleteOrgButton() {
	const [open, setOpen] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const params = useParams()
	const orgId = params?.orgId as string

	const handleDelete = async () => {
		if (!orgId) {
			setError('Organization ID not found')
			return
		}

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

			// delete the user_org_role relationships first
			const { error: relationError } = await supabase.from('user_org_role').delete().eq('org_id', parseInt(orgId))

			if (relationError) {
				throw relationError
			}

			// delete the organization
			const { error: orgError } = await supabase.from('orgs').delete().eq('org_id', parseInt(orgId))

			if (orgError) {
				throw orgError
			}

			// redirect to orgs list
			router.push('/protected/orgs')
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'Failed to delete organization')
		} finally {
			setIsLoading(false)
		}
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
				{error && <p className='text-sm text-red-500'>{error}</p>}
				<DialogFooter>
					<Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button type='button' variant='destructive' onClick={handleDelete} disabled={isLoading}>
						{isLoading ? 'Deleting...' : 'Delete Organization'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
