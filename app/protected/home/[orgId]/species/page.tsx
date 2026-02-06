import { SpeciesPage } from '@/components/features/species/species-page'

export default function Page() {
	return (
		<div className='flex flex-col mx-auto w-full max-w-6xl'>
			<h1 className='text-2xl font-semibold mb-4'>Species</h1>
			<SpeciesPage />
		</div>
	)
}
