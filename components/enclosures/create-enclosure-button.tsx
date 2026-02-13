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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useCreateEnclosure } from '@/lib/react-query/mutations'
import { useCurrentClientUser } from '@/lib/react-query/auth'
import { useOrgLocations, useOrgSpecies } from '@/lib/react-query/queries'
// import type {Enclosure, Species} from '@lib/react-query/queries'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export function CreateEnclosureButton({ orgId }: { orgId: number }) {
	const [open, setOpen] = useState(false)
	const [name, setName] = useState('')
	const [species, setSpecies] = useState('')
	const [location, setLocation] = useState('')
	const [count, setCount] = useState(0)
	const { data: user } = useCurrentClientUser()
	const createEnclosureMutation = useCreateEnclosure()

	const { data: orgSpecies } = useOrgSpecies(orgId)
	const speciesNames = orgSpecies?.map((species) => species?.common_name) ?? []
	// console.log(speciesNames)
	const { data: orgLocations } = useOrgLocations(orgId)
	const locationNames = orgLocations?.map((location) => location.name) ?? []
	// console.log('Locations ' + locationNames)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		console.log(species)
		if (!name || !species || !location) return

		const species_id = orgSpecies?.find((spec) => spec?.common_name === species)
		const location_id = orgLocations?.find((loc) => loc?.name === location)
		console.log(species_id)

		if (!species_id || !location_id) {
			console.log('ERROR LOOKING UP SPECIES OR LOCATION')
			return
		}
		console.log('MUTATING')
		createEnclosureMutation.mutate(
			{ orgId: orgId, species_id: species_id?.id, name: name, location: location_id?.id, current_count: count },
			{
				onSuccess: () => {
					setOpen(false)
					setName('')
					setSpecies('')
					setLocation('')
					setCount(0)
				}
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='secondary'>
					Create Enclosure <PlusIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Create Enclosure</DialogTitle>
						<DialogDescription>All fields are required.</DialogDescription>
					</DialogHeader>
					<DialogBody>
						<div className='grid py-4 px-10'>
							<div className='grid grid-cols-2 gap-3'>
								<Label>Enclosure Name</Label>
								<Input
									id='name'
									placeholder='Enclosure'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									disabled={createEnclosureMutation.isPending}
								/>
								<Label>Species</Label>
								<Select value={species} onValueChange={(e) => setSpecies(e)}>
									<SelectTrigger className='min-w-47'>
										<SelectValue placeholder='Species' />
									</SelectTrigger>
									<SelectContent className='min-w-47'>
										{speciesNames.map((species) => (
											<SelectItem key={species} value={species ?? ''}>
												{species}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Label>Enclosure Location</Label>
								<Select value={location} onValueChange={(e) => setLocation(e)}>
									<SelectTrigger className='min-w-47'>
										<SelectValue placeholder='Location' />
									</SelectTrigger>
									<SelectContent className='min-w-47'>
										{locationNames.map((location) => (
											<SelectItem key={location} value={location}>
												{location}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Label>Count</Label>
								<Input
									className='min-w-47 h-8'
									id='count'
									placeholder='Count'
									value={count}
									type='number'
									min='0'
									onChange={(e) => setCount(Number(e.target.value))}
									required
									disabled={createEnclosureMutation.isPending}
								/>
							</div>
						</div>
					</DialogBody>
					<DialogFooter className='mt-3'>
						<DialogClose asChild>
							<Button type='button' variant='outline' disabled={createEnclosureMutation.isPending}>
								Cancel
							</Button>
						</DialogClose>
						<Button type='submit' disabled={createEnclosureMutation.isPending || !user}>
							{createEnclosureMutation.isPending ? <LoaderCircle className='animate-spin' /> : 'Create Enclosure'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
