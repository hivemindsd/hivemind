import { TaskDropdownMenu } from '@/components/dropdown-demo'

export default function TaskPage() {
	return (
		<nav className='w-full flex justify-center border-b bg-muted/30 h-24'>
			<div className='w-full max-w-5xl flex items-center justify-center  px-5 gap-4'>
				<TaskDropdownMenu />
			</div>
		</nav>
	)
}
