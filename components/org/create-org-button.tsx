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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CreateOrgButton() {
	const [open, setOpen] = useState(false)
	const [name, setName] = useState('')
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

			// insert the organization
			const { data: org, error: orgError } = await supabase.from('orgs').insert({ name: name.trim() }).select().single()
			if (orgError) throw orgError

			// update the user_org_role table with proper access level
			const { error: relationError } = await supabase.from('user_org_role').insert({
				user_id: user?.id,
				org_id: org?.org_id,
				access_lvl: 3
			})

			if (relationError) {
				// if we fail to update the user_org_role table, delete the org.
				await supabase.from('orgs').delete().eq('org_id', org?.org_id)
				throw relationError
			}

			// close dialog and refresh
			setOpen(false)
			setName('')
			router.refresh()
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'Failed to create organization')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='secondary'>
					Create Organization <PlusIcon className='w-4 h-4' />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Create Organization</DialogTitle>
						<DialogDescription>Create a new organization. You will be set as the owner.</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid gap-2'>
							<Label>Organization Name</Label>
							<Input
								id='name'
								placeholder='My Organization'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								disabled={isLoading}
							/>
						</div>
						{error && <p className='text-sm text-red-500'>{error}</p>}
					</div>
					<DialogFooter>
						<Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={isLoading}>
							Cancel
						</Button>
						<Button type='submit' disabled={isLoading}>
							{isLoading ? 'Creating...' : 'Create Organization'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
