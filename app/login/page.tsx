import { LoginForm } from "@/components/auth/login-form"

//export default function LoginPage() {
  //return (
    //<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      //<LoginForm />
    //</div>
  //)
//}
//import { SignIn } from "@clerk/nextjs";

//export default function LoginPage() {
  //return (
    //<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      //<SignIn />
    //</div>
  
  import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <SignUp  routing="hash" />
  
}

