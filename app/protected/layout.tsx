import { EnvVarWarning } from '@/components/env-var-warning'
import { AuthButton } from '@/components/account/auth-button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { hasEnvVars } from '@/lib/utils'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { DropdownMenuSubmenu } from "@/components/dropdown-demo"


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='min-h-screen flex flex-col items-center'>
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

				<nav className='w-full flex justify-center border-b bg-muted/30 h-24'>
                    <div className='w-full max-w-5xl flex items-center justify-center  px-5 gap-4'>
                        <DropdownMenuSubmenu />
                    </div>
                </nav>
				



				<div className='flex-1 flex flex-col gap-2 p-5'>{children}</div>
				<footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-4'>
					<p>Powered by sdmay26-03</p>
					<ThemeSwitcher />
				</footer>
			</div>
		</main>
	)
}
