'use client'
import { useState, useEffect } from 'react'
import type { Enclosure } from '@/lib/react-query/queries'
import { useOrgEnclosures } from '@/lib/react-query/queries'
import { EnclosureCard } from './enclosure-card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { ArrowDownIcon, ArrowUpIcon, Search } from 'lucide-react'
import { Button } from '../ui/button'

export function EnclosureGrid({ orgId }: { orgId: number }) {
	const { data: orgEnclosures } = useOrgEnclosures(orgId)
	const [displayedEnclosures, setDisplayedEnclosures] = useState<Enclosure[]>([])
	const [searchValue, setSearchValue] = useState('')
	const [searchCount, setSearchCount] = useState(0)
	const [sortUp, setSortUp] = useState(true)
	const [isSorted, setIsSorted] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (orgEnclosures) setDisplayedEnclosures(orgEnclosures)
	}, [orgEnclosures])

	useEffect(() => {
		if (searchValue.trim() === '') {
			setDisplayedEnclosures(orgEnclosures ?? [])
			setSearchCount(0)
			setIsLoading(false)
		}
	}, [searchValue, orgEnclosures])

	useEffect(() => {
		if (displayedEnclosures?.length > 0) {
			const temp = [...(displayedEnclosures ?? [])].toReversed()
			setDisplayedEnclosures(temp)
		}
	}, [sortUp])

	const handleSortChange = (sortOn: string) => {
		if (!displayedEnclosures?.length) return
		setIsLoading(true)

		if (sortOn === 'sort') {
			setDisplayedEnclosures(orgEnclosures ?? [])
			setIsSorted(false)
			setSortUp(true)
			setIsLoading(false)
			return
		}
		let sorted: Enclosure[] = []

		if (sortOn === 'name') {
			sorted = [...displayedEnclosures].sort((a, b) => {
				const na = a.name ?? ''
				const nb = b.name ?? ''
				return na.localeCompare(nb)
			})
		} else if (sortOn === 'species') {
			sorted = [...displayedEnclosures].sort((a, b) => {
				const na = a.species?.common_name ?? ''
				const nb = b.species?.common_name ?? ''
				return na.localeCompare(nb)
			})
		} else if (sortOn === 'population') {
			sorted = [...displayedEnclosures].sort((a, b) => {
				const na = a.current_count ?? 0
				const nb = b.current_count ?? 0
				return na - nb
			})
		}

		if (sorted.length > 0) {
			setDisplayedEnclosures(sorted)
		}
		setIsSorted(true)
		setIsLoading(false)
	}

	const handleSearch = () => {
		if (!searchValue.length || searchValue.trim() === '') return
		setIsLoading(true)
		let results: Enclosure[] = []
		const val = searchValue.trim().toLowerCase()

		results = [...(orgEnclosures ?? [])].filter((a) => {
			if (a.location && a.location.trim().toLowerCase().includes(val)) return true
			if (a.name && a.name.trim().toLowerCase().includes(val)) return true
			if (a.species?.common_name && a.species.common_name.trim().toLowerCase().includes(val)) return true
			if (a.species?.scientific_name && a.species.scientific_name.trim().toLowerCase().includes(val)) return true
			if (a.species?.care_instructions && a.species.care_instructions.trim().toLowerCase().includes(val)) return true
			return false
		})
		setDisplayedEnclosures(results)
		setSearchCount(results.length)
		setIsLoading(false)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			handleSearch()
		}
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<>
			<div className='rounded-xl border bg-muted/20 mb-2'>
				<div className='w-full p-4 flex flex-row gap-3'>
					<Select onValueChange={handleSortChange} defaultValue='sort' disabled={isLoading}>
						<SelectTrigger className='w-35'>
							<SelectValue placeholder='Sort' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='sort' className='text-xl'>
								Sort
							</SelectItem>
							<SelectItem value='name' className='text-xl'>
								Name
							</SelectItem>
							<SelectItem value='species' className='text-xl'>
								Species
							</SelectItem>
							<SelectItem value='population' className='text-xl'>
								Population
							</SelectItem>
						</SelectContent>
					</Select>
					<Button variant='outline' size='icon' onClick={() => setSortUp(!sortUp)} disabled={isLoading || !isSorted}>
						{sortUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
					</Button>
					<InputGroup className='w-40 sm:w-60 mx-auto sm:ml-auto sm:mr-0' onKeyDown={handleKeyDown}>
						<InputGroupInput
							placeholder='Search...'
							value={searchValue}
							onChange={(e) => {
								setSearchValue(e.target.value)
							}}
						/>
						<InputGroupAddon>
							<InputGroupButton onClick={handleSearch} disabled={isLoading}>
								<Search />
							</InputGroupButton>
						</InputGroupAddon>
						<InputGroupAddon className='hidden sm:block' align='inline-end'>
							{searchCount > 0 ? searchCount + ' Results' : ''}{' '}
						</InputGroupAddon>
					</InputGroup>
				</div>
			</div>
			<div className='rounded-xl border bg-muted/20'>
				<div className='h-full overflow-y-auto p-4'>
					<div className='grid grid-cols-2 gap-3'>
						{displayedEnclosures && displayedEnclosures.length > 0 ? (
							displayedEnclosures.map((enclosure) => (
								<EnclosureCard key={enclosure.id} orgId={orgId} enclosure={enclosure} />
							))
						) : searchValue && displayedEnclosures.length == 0 ? (
							<div className=''>No results... try again? </div>
						) : (
							<div>No tanks yet</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
