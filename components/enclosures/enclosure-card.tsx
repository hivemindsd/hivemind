'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog-to-drawer'
import { PlusIcon } from 'lucide-react'
import type { Enclosure } from '@/lib/react-query/queries'
import { InputGroup, InputGroupAddon, InputGroupButton } from '../ui/input-group'
import TextareaAutosize from 'react-textarea-autosize'

// const urgencyRing: Record<NonNullable<any['urgency']>, string> = {
// 	low: 'border-sky-400',
// 	med: 'border-amber-400',
// 	high: 'border-orange-500',
// 	critical: 'border-red-500'
// }

export function EnclosureCard({ orgId, enclosure }: { orgId: number; enclosure: Enclosure }) {
	// const ringClass = enclosure.urgency ? urgencyRing[enclosure.urgency] : 'border-sky-400'

	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [openNote, setOpenNote] = useState(false)

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant='secondary'
						className='rounded-xl border-2 bg-muted/50 text-center shadow-sm transition hover:bg-muted flex flex-col size-auto px-4 py-6'
					>
						<div className='text-xs'>Encl. #{enclosure.id}</div>
						<div className='text-base font-semibold'>{enclosure.name}</div>
						<div className='text-xs'>{enclosure.locations?.name}</div>
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Enclosure #{enclosure.id} - <span className='text-sm'>{enclosure.species?.common_name}</span>
						</DialogTitle>
						<p className='text-muted-foreground italic'>{enclosure.species?.scientific_name}</p>
					</DialogHeader>
					<DialogBody>
						<div className='flex flex-col'>
							<div className='text-sm text-muted-foreground flex flex-col'>
								<span>Population: {enclosure.current_count}</span>
							</div>
							<div className='flex h-28 w-28 items-center justify-center rounded-lg border bg-background text-xs text-muted-foreground mx-auto'>
								species image
							</div>
							<div className='grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] my-2'>
								<div className='bg-background rounded-xl flex flex-col'>
									<div className='p-2'>
										<h1 className='text-sm'>General Information</h1>
										<hr />
									</div>
									<div className='space-y-2 text-sm text-muted-foreground'>
										<div>
											<span className='font-medium text-foreground pl-2'>{enclosure.species?.care_instructions}</span>
										</div>
									</div>
								</div>
								<div className='bg-background rounded-xl flex flex-col'>
									<div className='p-2'>
										<h1 className='text-sm'>Notes</h1>
										<hr />
									</div>
									<div className='space-y-2 text-sm text-muted-foreground'>
										<div>
											<span className='font-medium text-foreground pl-2'>this is where the notes would go</span>
										</div>
									</div>
									<Button
										variant='secondary'
										className='max-w-fit ml-auto text-xs'
										onClick={() => setOpenNote(!openNote)}
									>
										<PlusIcon />
									</Button>
									{openNote && (
										<div className='grid w-full max-w-sm gap-6 pt-1'>
											<InputGroup>
												<TextareaAutosize
													data-slot='input-group-control'
													className='flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm'
													placeholder='Autoresize textarea...'
												/>
												<InputGroupAddon align='block-end'>
													<InputGroupButton className='ml-auto' size='sm' variant='default'>
														Submit
													</InputGroupButton>
												</InputGroupAddon>
											</InputGroup>
										</div>
									)}
								</div>
							</div>
							<div className='flex flex-row gap-2 justify-around'>
								<Button
									variant='secondary'
									onClick={() => {
										router.push(`/protected/orgs/${orgId}/enclosures/${enclosure.id}`)
									}}
								>
									View Tasks
								</Button>
							</div>
						</div>
					</DialogBody>
				</DialogContent>
			</Dialog>
		</>
	)
}
