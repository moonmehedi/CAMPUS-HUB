'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Earth } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import styles from './login-page.module.css';

export default function TeacherLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Mock teacher database
  const mockTeachers = [
    { phoneNumber: '1234567892', password: 'abcf' },
    { phoneNumber: '9876543210', password: 'wxyz' },
    { phoneNumber: '01841225706',password:'arqam'},
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the phone number and password match any teacher in the mock database
    const teacher = mockTeachers.find(
      (teacher) => teacher.phoneNumber === phoneNumber && teacher.password === password
    );

    if (teacher) {
      // Successful login
      console.log('Login successful:', { phoneNumber, rememberMe });
      setErrorMessage('');
      router.push('/Users/Admin/Home'); // Redirect to Admin dashboard
    } else {
      // Invalid credentials
      setErrorMessage('Invalid phone number or password. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.loginWrapper}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h1 className="text-2xl font-bold text-white mb-8 text-center">
              ADMIN LOGIN
            </h1>

            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium text-white">
                  PHONE NUMBER
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your phone number"
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
