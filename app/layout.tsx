import type { Metadata } from 'next'
import { Geist, Dancing_Script } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/lib/react-query/provider'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Hivemind',
	description: 'Hivemind is a platform for managing your invertebrates'
}

const geistSans = Geist({
	variable: '--font-geist-sans',
	display: 'swap',
	subsets: ['latin']
})

const dancingScript = Dancing_Script({
	variable: '--font-dancing-script',
	display: 'swap',
	subsets: ['latin']
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${geistSans.className} ${dancingScript.variable} antialiased`}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<QueryProvider>{children}</QueryProvider>
					<Toaster
						closeButton
						// toast for SIX-SEVEN seconds
						duration={6500}
						position='bottom-right'
						theme='system'
						richColors
						expand
						visibleToasts={4}
						gap={14}
						offset={18}
						toastOptions={{
							classNames: {
								toast: 'ring-2 ring-red-500/35 shadow-xl shadow-red-500/30'
							}
						}}
					/>
				</ThemeProvider>
			</body>
		</html>
	)
}
