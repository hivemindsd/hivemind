import { EnvVarWarning } from '@/components/env-var-warning'
import { AuthButton } from '@/components/account/auth-button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { hasEnvVars } from '@/lib/utils'
import Link from 'next/link'

export default function Home() {
	return (
		<main className='min-h-screen flex flex-col items-center'>
			<nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
				<div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
					{/* Top-right Sign In / Sign Up buttons */}
					<Link href={'/'} className='font-dancing-script text-4xl font-bold'>
						Hivemind
					</Link>
					{!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
				</div>
			</nav>

			<div className='flex-1 flex flex-col gap-20 max-w-5xl p-5'>
				<main className='flex-1 flex flex-col gap-6 px-4'>unprotected page (no sign in required)</main>
			</div>

			<footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-4'>
				<p>Powered by sdmay26-03</p>
				<ThemeSwitcher />
			</footer>
		</main>
	)
}
