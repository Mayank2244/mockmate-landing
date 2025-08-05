"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

interface AuthState {
  message: string | null
  success: boolean
}

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "Email and password are required." }
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, message: data.message || "Login failed. Please check your credentials." }
    }

    cookies().set("token", data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })
    cookies().set("refreshToken", data.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    redirect("/dashboard") // Assuming you have a /dashboard route
  } catch (error) {
    console.error("Login action error:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

export async function signup(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!firstName || !lastName || !email || !password) {
    return { success: false, message: "All fields are required." }
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, message: data.message || "Registration failed. Please try again." }
    }

    // Automatically log in the user after successful registration
    cookies().set("token", data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })
    cookies().set("refreshToken", data.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    redirect("/dashboard") // Redirect to dashboard after successful registration and login
  } catch (error) {
    console.error("Signup action error:", error)
    return { success: false, message: "An unexpected error occurred during registration. Please try again." }
  }
}
