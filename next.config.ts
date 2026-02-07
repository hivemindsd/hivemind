import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants'
import { spawnSync } from 'node:child_process'
import crypto from 'node:crypto'

const nextConfig: NextConfig = {
	/* config options here */
}

/**
 * Produces the Next.js configuration, applying Serwist service-worker integration for the development server and production build phases.
 *
 * @param phase - The Next.js lifecycle phase value used to decide whether to apply Serwist integration
 * @returns The NextConfig to use; when `phase` is the development server or production build, returns the configuration wrapped with Serwist (including a precache entry revision and service worker options), otherwise returns the original configuration unchanged
 */
export default async function config(phase: string): Promise<NextConfig> {
	if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
		const revision =
			spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).stdout?.trim() ?? crypto.randomUUID()

		const withSerwist = (await import('@serwist/next')).default({
			additionalPrecacheEntries: [{ url: '/~offline', revision }],
			swSrc: 'app/sw.ts',
			swDest: 'public/sw.js',
			disable: process.env.NODE_ENV !== 'production'
		})

		return withSerwist(nextConfig)
	}

	return nextConfig
}