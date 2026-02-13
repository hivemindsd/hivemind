'use client'
import { useOrgEnclosures } from '@/lib/react-query/queries'
import { EnclosureCard } from './enclosure-card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Search } from 'lucide-react'
// import { useState } from 'react'

export function EnclosureGrid({ orgId }: { orgId: number }) {
	const { data } = useOrgEnclosures(orgId)
	console.log(data)

	// const [searchValue, setSearchValue] = useState('')
	// const [searchResultCount, setSearchResultCount] = useState(0)

	return (
		<>
			<div className='rounded-xl border bg-muted/20 mb-2'>
				<div className='w-full p-4 flex flex-row gap-3 flex-wrap'>
					<div className='flex flex-row gap-1 sm:gap-4'>
						<Select defaultValue='filter'>
							<SelectTrigger className='w-44'>
								<SelectValue placeholder='Filter' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='filter'>Filter</SelectItem>
								<SelectItem value='urgent'>Urgent</SelectItem>
								<SelectItem value='assigned'>Assigned</SelectItem>
							</SelectContent>
						</Select>
						<Select defaultValue='sort'>
							<SelectTrigger className='w-44'>
								<SelectValue placeholder='Sort' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='sort'>Sort</SelectItem>
								<SelectItem value='name'>Location</SelectItem>
								<SelectItem value='recent'>Species</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<InputGroup className='w-56 mx-auto sm:ml-auto sm:mr-0'>
						<InputGroupInput placeholder='Search...' />
						<InputGroupAddon>
							<Search />
						</InputGroupAddon>
						{/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
					</InputGroup>
				</div>
			</div>
			<div className='rounded-xl border bg-muted/20'>
				<div className='h-full overflow-y-auto p-4'>
					<div className='grid grid-cols-2 gap-3'>
						{data && data.length > 0 ? (
							data.map((enclosure) => (
								<EnclosureCard
									key={enclosure.id}
									orgId={orgId}
									enclosure={enclosure}
									// selected={enclosure.id === selectedId}
									// onClick={() => onSelect(enclosure.id)}
								/>
							))
						) : (
							<div>No tanks yet</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
