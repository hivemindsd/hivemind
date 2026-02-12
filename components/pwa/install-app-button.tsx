'use client'

import { useInstallPrompt } from '@/hooks/use-install-prompt'
import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

export function InstallAppButton() {
	const { isInstallable, handleInstall } = useInstallPrompt()
	const [showInstall, setShowInstall] = useState(false)
	const [isIOS, setIsIOS] = useState(false)
	const [isInstalled, setIsInstalled] = useState(false)

	useEffect(() => {
		// Detect iOS
		const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
		setIsIOS(isApple)

		// Check if already installed on iOS
		if (isApple && (window.navigator as Navigator & { standalone?: boolean }).standalone) {
			setIsInstalled(true)
		}

		setShowInstall(isInstallable || isApple)
	}, [isInstallable])

	if (isInstalled) return null
	if (!showInstall) return null

	return (
		<button
			onClick={handleInstall}
			className='flex items-center gap-1.5 text-sm hover:underline cursor-pointer'
			title={isIOS ? 'Tap share, then "Add to Home Screen"' : 'Install app'}
		>
			<Download className='size-4' />
			Install
		</button>
	)
}
