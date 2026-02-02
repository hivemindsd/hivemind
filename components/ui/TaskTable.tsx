'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

function DialogScrollableContent({
	task_name,
	description,
	due_date,
	priority,
	status,
	isOpen,
	onOpenChange
}: Task & { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{task_name}</DialogTitle>
					<DialogDescription>
						{due_date} | {priority}
					</DialogDescription>
				</DialogHeader>
				<div className='no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4'>
					<p className='mb-4 leading-normal'>{description}</p>
				</div>
				<DialogFooter>
					<div className='flex flex-row gap-2 justify-evenly'>
						{status === 'unclaimed' && <Button type='button'>Start</Button>}
						{status === 'active' && <Button type='button'>End</Button>}
						<Button type='button'>Delete</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

import { useIsMobile } from '@/hooks/use-mobile'
import { useState } from 'react'

export type Task = {
	tank_id: string
	task_name: string
	description: string
	status: 'unclaimed' | 'active' | 'complete'
	due_date: string
	priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
}

export const columns: ColumnDef<Task>[] = [
	{
		accessorKey: 'tank_id',
		header: 'Tank ID',
		cell: ({ row }) => {
			const id_num: string = row.getValue('tank_id')
			return <div className='text-center'>{id_num}</div>
		}
	},
	{
		accessorKey: 'task_name',
		header: 'Task'
	},
	{
		accessorKey: 'status',
		header: 'Status'
	},
	{
		accessorKey: 'priority',
		header: 'Priority'
	}
]

interface TaskTableProps {
	columns: ColumnDef<Task>[]
	data: Task[]
}

export function TaskTable({ columns, data }: TaskTableProps) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel()
	})

	const [selectedTask, setSelectedTask] = useState<Task | null>(null)

	const isMobile = useIsMobile()

	return (
		<>
			{selectedTask && (
				<DialogScrollableContent
					{...selectedTask}
					isOpen={!!selectedTask}
					onOpenChange={(open) => !open && setSelectedTask(null)}
				/>
			)}
			<div className={'overflow-hidden rounded-md border -ml-5' + (isMobile ? ' max-w-fit' : '')}>
<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead className='text-left' key={header.id}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
								onClick={() => setSelectedTask(row.original)}
								role='button'
								tabIndex={0}
								className='cursor-pointer'
								aria-label={`Open task ${row.original.task_name}`}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault()
										setSelectedTask(row.original)
									}
								}}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell className={isMobile ? 'overflow-hidden' : 'w-3'} key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			</div>
		</>
	)
}
