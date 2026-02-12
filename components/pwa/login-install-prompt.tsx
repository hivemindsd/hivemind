'use client'

import { useEffect, useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useInstallPrompt } from '@/hooks/use-install-prompt'
import { Download } from 'lucide-react'

export function LoginInstallPrompt() {
	const { isInstallable, handleInstall } = useInstallPrompt()
	const [showPrompt, setShowPrompt] = useState(false)

	useEffect(() => {
		// Only show if installable and hasn't been dismissed this session
		if (isInstallable && !sessionStorage.getItem('installPromptDismissed')) {
			setShowPrompt(true)
		}
	}, [isInstallable])

	const handleDismiss = () => {
		sessionStorage.setItem('installPromptDismissed', 'true')
		setShowPrompt(false)
	}

	const handleInstallClick = () => {
		handleInstall()
		handleDismiss()
	}

	return (
		<Dialog open={showPrompt} onOpenChange={handleDismiss}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Download className='size-5' />
						Install Hivemind
					</DialogTitle>
					<DialogDescription>Install our app for quick access and an app-like experience.</DialogDescription>
				</DialogHeader>
				<div className='flex justify-end gap-2'>
					<DialogClose asChild>
						<Button variant='outline'>Not now</Button>
					</DialogClose>
					<Button onClick={handleInstallClick}>Install</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
