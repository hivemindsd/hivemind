'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './client'
import { ReactNode } from 'react'

export function QueryProvider({ children }: { children: ReactNode }) {
	const queryClient = getQueryClient()

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
