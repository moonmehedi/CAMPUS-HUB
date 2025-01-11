'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Earth } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import styles from '../styles/login-page.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Mock user database
  const mockUsers = [
    { username: 'maisha96', password: '1234' },
    { username: 'moon48', password: '9088' },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the username and password match any user in the mock database
    const user = mockUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Successful login
      console.log('Login successful:', { username, rememberMe });
      setErrorMessage('');
      router.push('/Users/Student/Home'); // Redirect to dashboard
    } else {
      // Invalid credentials
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

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
                  onCheckedChange={(checked) => {
                    if (typeof checked === "boolean") {
                      setRememberMe(checked);
                    }
                  }}
                  className={styles.checkbox}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium text-white cursor-pointer"
                >
                  Remember Me
                </label>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}

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
                  <Earth className="mr-2 h-4 w-4" />
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
  );
}
