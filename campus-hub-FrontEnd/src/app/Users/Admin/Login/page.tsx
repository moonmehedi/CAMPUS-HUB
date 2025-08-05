"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Earth } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoginService } from "./login";
import styles from "./login-page.module.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetMessage, setResetMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
  
    try {
      const response = await fetch("http://localhost:3000/auth_admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensure session cookies are sent
      });
  
      const data = await response.json();
      console.log("🔍 Login Response:", data);
  
      if (!data.success) throw new Error(data.message || "Invalid credentials");
  
      // Pass the email to the home page via query parameters
      router.push(`/Users/Admin/Home?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error("❌ Login Error:", err.message);
      setErrorMessage(err.message);
    }
  };
  

  const handlePasswordReset = async () => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "forgot", email: resetEmail }),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const error = await response.json()
          throw new Error(error.error)
        } else {
          throw new Error("An unexpected error occurred. Please try again later.")
        }
      }

      const data = await response.json()
      setResetMessage(data.message)
      setTimeout(() => setShowResetModal(false), 2000)
    } catch (err) {
      setResetMessage(err.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "google" }),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const error = await response.json()
          throw new Error(error.error)
        } else {
          throw new Error("An unexpected error occurred. Please try again later.")
        }
      }

      const data = await response.json()
      window.location.href = data.url // Redirect to Google sign-in
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.loginWrapper}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h1 className="text-2xl font-bold text-white mb-8 text-center">ADMIN LOGIN</h1>

            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  EMAIL
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  PASSWORD
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    if (typeof checked === "boolean") {
                      setRememberMe(checked)
                    }
                  }}
                  className={styles.checkbox}
                />
                <label htmlFor="remember" className="text-sm font-medium text-white cursor-pointer">
                  Remember Me
                </label>
              </div>

              {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

              <div className="space-y-4">
                <Button type="submit" className={styles.loginButton} size="lg">
                  Log in
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className={styles.googleButton}
                  size="lg"
                  onClick={handleGoogleSignIn}
                >
                  <Earth className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </div>

              <button type="button" className={styles.forgotPassword} onClick={() => setShowResetModal(true)}>
                Forgot Password? Reset Now
              </button>
            </div>
          </form>
        </div>
      </div>

      <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <Button onClick={handlePasswordReset}>Send Reset Link</Button>
            {resetMessage && <p className="text-sm text-gray-600">{resetMessage}</p>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

