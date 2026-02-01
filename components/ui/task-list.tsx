import { TaskTable } from './TaskTable'
import { columns, Task } from './TaskTable'

export default function TaskList()
{
	const list: Task[] = [
		{
			tank_id: "1",
			task_name: "Clean Tank",
			description: "Tank needs to be cleaned. Might need two people on this.",
			status: "unclaimed",
			due_date: "Today",
			priority: "URGENT"
		},
		{
			tank_id: "2",
			task_name: "Feed Tarantula",
			description: "Torantula needs fed. Take out of tank and inspect to ensure specimen physical condition.",
			status: "active",
			due_date: "Today",
			priority: "URGENT"
		},
		{
			tank_id: "2",
			task_name: "Check Temperature",
			description: "Check temperature and report to Nathan",
			status: "unclaimed",
			due_date: "Today",
			priority: "URGENT"
		},
	]
	
return (
	<TaskTable columns={columns} data={list}/>
)
}

