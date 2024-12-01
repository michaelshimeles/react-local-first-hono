import { SignUp } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-col justify-center items-center w-full p-24'>
      <SignUp
        path="/sign-up"
        routing="path"
      />
    </div>
  )
}
