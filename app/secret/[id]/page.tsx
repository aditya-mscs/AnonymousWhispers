import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Suspense, lazy } from "react"
import { mockSecrets } from "@/lib/mock-data"
import { AdBanner } from "@/components/ad-banner"

// Lazy load components
const SecretCard = lazy(() => import("@/components/secret-card").then((mod) => ({ default: mod.SecretCard })))

// Loading fallback
const LoadingSpinner = () => (
  <div className="flex justify-center py-8">
    <div className="h-8 w-8 border-4 border-t-purple-500 border-gray-200 rounded-full animate-spin"></div>
  </div>
)

interface SecretPageProps {
  params: {
    id: string
  }
}

export default function SecretPage({ params }: SecretPageProps) {
  const secret = mockSecrets.find((s) => s.id === params.id)

  if (!secret) {
    notFound()
  }

  return (
    <div className="container max-w-2xl py-8 px-4">
      <div className="space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <AdBanner position="top" />

        <Suspense fallback={<LoadingSpinner />}>
          <SecretCard secret={secret} />
        </Suspense>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          <p>This secret was shared anonymously on Anonymous Dark Secrets.</p>
          <p>If you're experiencing distress, please reach out for help.</p>
        </div>

        <AdBanner position="bottom" />
      </div>
    </div>
  )
}

