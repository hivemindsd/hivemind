import type { NextConfig } from 'next'
import {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_BUILD,
} from 'next/constants'
import { spawnSync } from 'node:child_process'
import crypto from 'node:crypto'


const nextConfig: NextConfig = {
	/* config options here */
}

export default async function config(
  phase: string
): Promise<NextConfig> {
  if (
    phase === PHASE_DEVELOPMENT_SERVER ||
    phase === PHASE_PRODUCTION_BUILD
  ) {
    const revision =
      spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' })
        .stdout?.trim() ?? crypto.randomUUID()

    const withSerwist = (
      await import('@serwist/next')
    ).default({
      additionalPrecacheEntries: [
        { url: '/~offline', revision }
      ],
      swSrc: 'app/sw.ts',
      swDest: 'public/sw.js',
	  disable: process.env.NODE_ENV !== 'production'
    })

    return withSerwist(nextConfig)
  }

  return nextConfig
}