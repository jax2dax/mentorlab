import { SignIn } from "@clerk/nextjs"

const Page = () => {
  return (<main className="flex items-center justify-center h-screen">
    Sign-In
    <SignIn 
     //path="/sign-in"  // MUST match your route
      //routing="path"   // tells Clerk to use client-side routing
      //redirectUrl="/"  // optional, after sign-in/
      />
    </main>

  )
}

export default Page
