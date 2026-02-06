import { EnclosuresPage } from '@/components/features/enclosures/enclosures-page'

export default function Page() {
	return (
		<div className='flex flex-col mx-auto w-full max-w-6xl'>
			<h1 className='text-2xl font-semibold mb-4'>Enclosures</h1>
			<EnclosuresPage />
		</div>
	)
}
