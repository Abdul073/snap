import * as z from "zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

import { useCreateUserAccount, usesignInAccount } from "@/lib/react-query/QueriesAndMutations"
import { sighUpValidation } from "@/lib/validation"
import { useUsersContext } from "@/context/Authcontex"









const SignupForm = () => {
  const { toast } = useToast();
  const {checkAuthUser, isLoading: isUserLoading} = useUsersContext();
  const navigate = useNavigate();

  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();

  const {mutateAsync: sighInAccount, isPending: isSigningIn} = usesignInAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof sighUpValidation>>({
    resolver: zodResolver(sighUpValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })

  
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof sighUpValidation>) {
    const newUser = await createUserAccount(values);

    if(!newUser){
      return toast({title: 'Sign up faild.please try again'})
    }
    const session = await sighInAccount({
      email: values.email,
      password: values.password,
    })
    if(!session){
      return toast({title: 'sigh in faild. please try again'})
    }
    
    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset();
      navigate('/')
    }else {
      return toast({title:'sign up faild. please try again'})
    }
  }




  return (
    
      <Form {...form}>

        <div className=" sm:w-420 flex-center flex-col">
          <img src="/public/assets/images/logo.svg" alt="logo"/>
          <h2 className=" h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
          <p className=" text-light-3 small-medium md:base-regular mt-12">To use snapgram, please enter your details</p>


      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {isCreatingAccount ? (
            <div className="flex-center gap-2">
              < Loader/> Loading...
            </div>
          ): "sign up"}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account?
          <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
        </p>
      </form>
      </div>
    </Form>
  )
}

export default SignupForm