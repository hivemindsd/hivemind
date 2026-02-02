import { EnvVarWarning } from '@/components/env-var-warning'
import { AuthButton } from '@/components/account/auth-button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { hasEnvVars } from '@/lib/utils'
import Link from 'next/link'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import  TaskList  from '@/components/ui/task-list'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger className='ml-1 mt-4' size={'icon-lg'} />
			<main className='flex w-full flex-col items-center'>
				<div className='flex-1 w-full flex flex-col gap-2'>
					<nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
						<div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
							<div className='flex gap-5 items-center'>
								<Link href={'/'} className='font-dancing-script text-4xl font-bold'>
									Hivemind
								</Link>
							</div>
							{!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
						</div>
					</nav>
					<div className='flex-1 flex flex-col gap-2 p-5'>{<TaskList/>}{children}</div>
					

					<footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-4'>
						<p>Powered by sdmay26-03</p>
						<ThemeSwitcher />
					</footer>
				</div>
			</main>
		</SidebarProvider>
	)
}
