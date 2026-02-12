'use client'

import { useInstallPrompt } from '@/hooks/use-install-prompt'
import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function InstallAppButton() {
	const { isInstallable, handleInstall } = useInstallPrompt()
	const [isInstalled, setIsInstalled] = useState(false)
	const [showInstructions, setShowInstructions] = useState(false)
	const [isIOS, setIsIOS] = useState(false)

	useEffect(() => {
		// Detect iOS or iPadOS 13+ (Mac userAgent with touch support)
		const ua = navigator.userAgent || ''
		const isApple = /iPad|iPhone|iPod/.test(ua) || (ua.includes('Macintosh') && 'ontouchend' in document)
		setIsIOS(isApple)

		// Check if already installed: iOS standalone flag OR any platform with display-mode standalone
		const iosStandalone = isApple && (window.navigator as Navigator & { standalone?: boolean }).standalone
		const displayStandalone =
			typeof window.matchMedia === 'function' && window.matchMedia('(display-mode: standalone)').matches
		if (iosStandalone || displayStandalone) {
			setIsInstalled(true)
		}
	}, [])

	const handleClick = () => {
		if (isInstallable) {
			handleInstall()
		} else {
			setShowInstructions(true)
		}
	}

	if (isInstalled) return null

	return (
		<>
			<button onClick={handleClick} className='flex items-center gap-1.5 text-sm hover:underline cursor-pointer'>
				<Download className='size-4' />
				Install app
			</button>

			<Dialog open={showInstructions} onOpenChange={setShowInstructions}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Install App</DialogTitle>
						<DialogDescription>
							{isIOS
								? 'To add this app to your home screen: Tap the Share button by the search bar, then scroll down and tap "Add to Home Screen".'
								: 'To install this app, use your browser menu to add it to your home screen.'}
						</DialogDescription>
					</DialogHeader>
					<div className='flex justify-end gap-2'>
						<DialogClose asChild>
							<Button variant='outline'>Close</Button>
						</DialogClose>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
