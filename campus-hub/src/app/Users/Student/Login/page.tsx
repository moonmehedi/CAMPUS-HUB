'use client'

import { useState } from 'react'
import { Chrome } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import styles from './login-page.module.css'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Form submitted:', { username, password, rememberMe })
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.loginWrapper}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h1 className="text-2xl font-bold text-white mb-8 text-center">
              STUDENT LOGIN
            </h1>
            
            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-white">
                  USER NAME
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  PASSWORD
                </label>
                <Input
                  id="password"
                  name="password"
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
                  onCheckedChange={(checked) => setRememberMe(checked)}
                  className={styles.checkbox}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium text-white cursor-pointer"
                >
                  Remember Me
                </label>
              </div>

              <div className="space-y-4">
                <Button type="submit" className={styles.loginButton} size="lg">
                  Log in
                </Button>

                <Button 
                  type="button"
                  variant="outline" 
                  className={styles.googleButton} 
                  size="lg"
                  onClick={() => console.log('Google sign-in clicked')}
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </div>

              <button 
                type="button"
                className={styles.forgotPassword}
                onClick={() => console.log('Forgot password clicked')}
              >
                Forget Password? Reset Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

