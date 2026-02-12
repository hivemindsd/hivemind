'use client'

import { useInstallPrompt } from '@/hooks/use-install-prompt'
import { useEffect, useState } from 'react'

export function InstallAppButton() {
	const { isInstallable, handleInstall } = useInstallPrompt()
	const [showInstall, setShowInstall] = useState(false)

	useEffect(() => {
		setShowInstall(isInstallable)
	}, [isInstallable])

	if (!showInstall) return null

	return (
		<button onClick={handleInstall} className='text-sm hover:underline cursor-pointer'>
			Install app
		</button>
	)
}
