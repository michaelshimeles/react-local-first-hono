import { useAuth } from "@clerk/clerk-react"
import { RouterProvider } from "@tanstack/react-router"

export default function RouterWithAuthContext({ router }: { router: any }) {

  const auth = useAuth()

  return <RouterProvider router={router} context={{
    auth
  }} />
}