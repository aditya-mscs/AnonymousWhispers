import { Suspense, lazy } from "react"
import { AdBanner } from "@/components/ad-banner"
import * as Tabs from "@radix-ui/react-tabs"
import { mockSecrets } from "@/lib/mock-data"

// Lazy load components
const SecretInput = lazy(() => import("@/components/secret-input").then((mod) => ({ default: mod.SecretInput })))
const SecretCard = lazy(() => import("@/components/secret-card").then((mod) => ({ default: mod.SecretCard })))

// Loading fallback
const LoadingSpinner = () => (
  <div className="flex justify-center py-8">
    <div className="h-8 w-8 border-4 border-t-purple-500 border-gray-200 rounded-full animate-spin"></div>
  </div>
)

export default function HomePage() {
  return (
    <div className="container py-8 px-4">
      <div className="space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Share Your Darkest Secrets Anonymously</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            A safe space to vent without judgment. No names, no traces, just release.
          </p>
        </div>

        <AdBanner position="top" />

        <Suspense fallback={<LoadingSpinner />}>
          <SecretInput />
        </Suspense>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">People's Secrets</h2>
          </div>

          <Tabs.Root defaultValue="recent" className="w-full">
            <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <Tabs.Trigger
                value="recent"
                className="px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400"
              >
                Most Recent
              </Tabs.Trigger>
              <Tabs.Trigger
                value="dark"
                className="px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400"
              >
                Most Dark
              </Tabs.Trigger>
              <Tabs.Trigger
                value="trending"
                className="px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400"
              >
                Trending
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="recent" className="pt-4">
              <Suspense fallback={<LoadingSpinner />}>
                <div className="space-y-6">
                  {mockSecrets
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .map((secret) => (
                      <SecretCard key={secret.id} secret={secret} />
                    ))}
                </div>
              </Suspense>
            </Tabs.Content>

            <Tabs.Content value="dark" className="pt-4">
              <Suspense fallback={<LoadingSpinner />}>
                <div className="space-y-6">
                  {mockSecrets
                    .sort((a, b) => b.darknessLevel - a.darknessLevel)
                    .map((secret) => (
                      <SecretCard key={secret.id} secret={secret} />
                    ))}
                </div>
              </Suspense>
            </Tabs.Content>

            <Tabs.Content value="trending" className="pt-4">
              <Suspense fallback={<LoadingSpinner />}>
                <div className="space-y-6">
                  {mockSecrets
                    .sort((a, b) => b.interactions - a.interactions)
                    .map((secret) => (
                      <SecretCard key={secret.id} secret={secret} />
                    ))}
                </div>
              </Suspense>
            </Tabs.Content>
          </Tabs.Root>
        </div>

        <AdBanner position="bottom" />
      </div>
    </div>
  )
}

