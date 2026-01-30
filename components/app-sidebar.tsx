"use client'"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton
} from '@/components/ui/sidebar'
import { Command } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogoutButton } from '@/components/account/logout-button'
import { EnvVarWarning } from '@/components/env-var-warning'
import { hasEnvVars } from '@/lib/utils'
import { getCurrentServerUser } from '@/lib/supabase/server'

export async function AppSidebar() {
	const user = await getCurrentServerUser()

	const items = [
		{
			title: 'Home',
			url: '/protected/orgs'
		}
	]

	return (
		<Sidebar variant='floating'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenuButton className='mb-2.5' size='lg' asChild>
						<a href='/protected'>
							<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
								<Command className='size-4' />
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>Hivemind</span>
							</div>
						</a>
					</SidebarMenuButton>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton className='text-xl my-1' asChild>
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
								<SidebarMenuButton variant='outline'>
									{!hasEnvVars ? (
										<EnvVarWarning />
									) : (
										<div className='mx-auto'>
											<span className='font-bold'>{user?.email ?? 'unknown'}</span>
										</div>
									)}
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
								<DropdownMenuItem>
									<a className='mx-auto' href='/protected/account'>
										Account
									</a>
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
