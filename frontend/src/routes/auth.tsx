import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { SignIn, SignUp } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/auth')({
  component: Auth,
})




export function Auth() {
  return (
    <div className="flex flex-col justify-center items-center w-full p-24">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 mb-[3rem]">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <SignIn path="/auth"
            routing="path"
          />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp
            path="/auth"
            routing="path"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
