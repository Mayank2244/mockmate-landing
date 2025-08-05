import { SignIn } from '@clerk/nextjs'

//import { RegisterForm } from "@/components/auth/register-form"

//export default function RegisterPage() {
  //return (
    //<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      //<RegisterForm />
    //</div>
  //)
//}
export default function Page() {
  return <SignIn routing="hash" />
}
 
 
//import { SignUp } from '@clerk/nextjs';

//export default function RegisterPage() {
  //return (
    //<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      //<SignUp />
    //</div>
  //);
//}