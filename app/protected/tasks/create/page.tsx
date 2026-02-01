import { InputForm } from '@/components/input-create'

export default function CreateTaskPage() {
	return (
		<div className='space-y-4'>
			<h1 className='text-3xl font-bold tracking-tight'>Create Task</h1>
			<p className='text-muted-foreground'>Implement creating a task.</p>
			<div className='border rounded-lg p-6'>
				<InputForm />
			</div>
		</div>
	)
}
