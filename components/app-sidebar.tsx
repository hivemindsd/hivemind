import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from '@/components/ui/sidebar'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from '@/components/account/logout-button'

import Link from 'next/link'
import { EnvVarWarning } from '@/components/env-var-warning'
import { hasEnvVars } from '@/lib/utils'

async function Username() {
	const supabase = await createClient()

	// You can also use getUser() which will be slower.
	const { data } = await supabase.auth.getClaims()

	const user = data?.claims

	return user ? (
		<div className='flex flex-col mx-auto gap-4'>
			<span className='md:block '>{user.email}</span>
		</div>
	) : (
		<>ERROR</>
	)
}

export function AppSidebar() {
	const items = [
		{
			title: 'Home',
			url: '#',
		},
		{
			title: 'Inbox',
			url: '#',
		},
		{
			title: 'Settings',
			url: '#',
		}
		,
		{
			title: 'Organizations',
			url: '#',
		}
	]

	return (
		<Sidebar variant='floating'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Hivemind</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>{!hasEnvVars ? <EnvVarWarning /> : <Username />}</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
								<DropdownMenuItem>
									<Link className='mx-auto' href='#'>
										Account
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<LogoutButton />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
