'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Field, FieldGroup, FieldLabel, FieldSet, FieldLegend } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function InputForm() {
	const [schdeule, setSchedule] = useState('day')
	const isCustom = schdeule == 'Custom'

	return (
		<form
			className='w-full max-w-sm'
			onSubmit={() => {
				console.log(document.getElementById('form-schedule')?.textContent)
			}}
		>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor='form-name'>Task Name{<span className='text-destructive'>*</span>}</FieldLabel>
					<Input id='form-name' type='text' placeholder='Enter title/task name' required />
				</Field>

				<FieldSet className='w-full max-w-xs'>
					<FieldLegend variant='label'>Schedule {<span className='text-destructive'>*</span>}</FieldLegend>
					<RadioGroup defaultValue='Daily' value={schdeule} onValueChange={setSchedule} required>
						<Field orientation='horizontal'>
							<RadioGroupItem value='daily' id='schedule-daily' />
							<FieldLabel htmlFor='schedule-monthly' className='font-normal'>
								Daily
							</FieldLabel>
						</Field>
						<Field orientation='horizontal'>
							<RadioGroupItem value='weekly' id='schedule-weekly' />
							<FieldLabel htmlFor='schedule-weekly' className='font-normal'>
								Weekly
							</FieldLabel>
						</Field>
						<Field orientation='horizontal'>
							<RadioGroupItem value='monthly' id='schedule-monthly' />
							<FieldLabel htmlFor='schedule-monthly' className='font-normal'>
								Monthly
							</FieldLabel>
						</Field>
						<Field orientation='horizontal'>
							<RadioGroupItem value='yearly' id='schedule-yearly' />
							<FieldLabel htmlFor='schedule-yearly' className='font-normal'>
								Yearly
							</FieldLabel>
						</Field>
						<Field orientation='horizontal'>
							<RadioGroupItem value='Custom' id='schedule-custom' />
							<FieldLabel htmlFor='schedule-custom' className='font-normal'>
								Custom
							</FieldLabel>
						</Field>
					</RadioGroup>
				</FieldSet>

				<div className={`grid grid-cols-2 gap-4 ${!isCustom && 'opacity-100 pointer-events-none'}`}>
					<Field>
						<FieldLabel htmlFor='form-every-custom'>
							Every {isCustom && <span className='text-destructive'>*</span>}
						</FieldLabel>
						<Input id='form-every-custom' type='number' placeholder='2' required={isCustom} disabled={!isCustom} />
					</Field>
					<Field>
						<FieldLabel htmlFor='form-unit'>Unit {isCustom && <span className='text-destructive'>*</span>}</FieldLabel>
						<Select disabled={!isCustom}>
							<SelectTrigger id='form-unit'>
								<SelectValue placeholder='Days' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='D'>Days</SelectItem>
								<SelectItem value='W'>Weeks</SelectItem>
								<SelectItem value='M'>Months</SelectItem>
							</SelectContent>
						</Select>
					</Field>
				</div>

				<Field orientation='horizontal'>
					<Button type='button' variant='outline'>
						Cancel
					</Button>
					<Button type='submit'>Submit</Button>
				</Field>
			</FieldGroup>
		</form>
	)
}
