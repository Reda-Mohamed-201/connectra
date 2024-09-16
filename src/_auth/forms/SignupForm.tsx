"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpValidationSchema } from "@/lib/validation";
import Spinner from "@/components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutaions";
import { useUserContext } from "@/context/AuthContext";

export default function SignupForm() {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { toast } = useToast();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const form = useForm<z.infer<typeof signUpValidationSchema>>({
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  // async function onSubmit(values: z.infer<typeof signUpValidationSchema>) {
  //   const newUser = await createUserAccount(values);
  //   if (!newUser) {
  //     return toast({
  //       title: "Sign up failed. Please try again",
  //     });
  //   }
  //   const session = await signInAccount({
  //     email: values.email,
  //     password: values.password,
  //   });
  //   if (!session) {
  //     return toast({
  //       title: "Sign up failed. Please try again",
  //     });
  //   }
  //   const isLoggedIn = await checkAuthUser();
  //   if (isLoggedIn) {
  //     form.reset();
  //     navigate("/");
  //   } else {
  //     return toast({
  //       title: "Sign up failed. Please try again",
  //     });
  //   }
  // }
  async function onSubmit(values: z.infer<typeof signUpValidationSchema>) {
    try {
      // Attempt to create a new user account
      const newUser = await createUserAccount(values);
      if (!newUser) {
        // Notify user if account creation fails
        return toast({
          title: "Sign up failed. Please try again",
        });
      }

      // Attempt to sign in with the created account
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });
      if (!session) {
        // Notify user if sign-in fails
        return toast({
          title: "Sign in failed. Please check your credentials and try again",
        });
      }

      // Check if the user is authenticated
      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        // Reset form and navigate if the user is logged in
        form.reset();
        navigate("/");
      } else {
        // Notify user if authentication check fails
        return toast({
          title: "Authentication failed. Please try again",
        });
      }
    } catch (error) {
      // Catch and log any unexpected errors
      console.error("Unexpected error:", error);
      toast({
        title: "An unexpected error occurred. Please try again later",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex flex-col items-center ju">
        <img src="/assets/images/logo.svg" alt="logo" className=" " />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-10 text-light-2">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Connectra, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
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
                  <Input type="email" className="shad-input" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary mt-5 h-9">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                Loading
                <Spinner />
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2 ">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 underline text-sm font-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
