import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 text-center p-4">
      <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
      <h2 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h2>
      <p className="text-lg text-slate-600 mb-8 max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" passHref legacyBehavior>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-medium"
        >
          Return to Homepage
        </Button>
      </Link>
    </div>
  )
}
