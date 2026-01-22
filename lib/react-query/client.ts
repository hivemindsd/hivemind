'use client'

import { QueryClient, QueryCache } from '@tanstack/react-query'
import { toast } from 'sonner'

export function makeQueryClient() {
	const queryCache = new QueryCache({
		onError: (error) => {
			toast.error(`DB Query Failed: ${error.message}` || 'Failed to load data')
		}
	})

	return new QueryClient({
		queryCache,
		defaultOptions: {
			queries: {
				retry: 1,
				refetchOnWindowFocus: false,
				throwOnError: false
			},
			mutations: {
				onError: (error) => {
					toast.error(`Mutation Failed: ${error.message}` || 'An error occurred')
				}
			}
		}
	})
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return makeQueryClient()
	} else {
		// Browser: make a new query client if we don't already have one
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
}
