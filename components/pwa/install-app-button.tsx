'use client'

import { useInstallPrompt } from '@/hooks/use-install-prompt'
import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

export function InstallAppButton() {
	const { isInstallable, handleInstall } = useInstallPrompt()
	const [showInstall, setShowInstall] = useState(false)

	useEffect(() => {
		setShowInstall(isInstallable)
	}, [isInstallable])

	if (!showInstall) return null

	return (
		<button onClick={handleInstall} className='flex items-center gap-1.5 text-sm hover:underline cursor-pointer'>
			<Download className='size-4' />
			Install app
		</button>
	)
}
