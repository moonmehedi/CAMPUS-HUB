'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Earth } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import styles from './login-page.module.css';

export default function TeacherLoginPage() {
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      console.log('Submitting form with:', { teacher_id: teacherId }); // Debug log

      const response = await fetch('http://localhost:3000/auth_teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          teacher_id: teacherId,
          password
        }),
      });

      console.log('Response status:', response.status); // Debug log

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not ok:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response format from server');
      }

      console.log('Response data:', data); // Debug log

      if (data.success) {
        if (rememberMe) {
          localStorage.setItem('teacherId', data.teacher_id.toString());
          localStorage.setItem('teacherName', data.name);
        }

        console.log('Login successful, redirecting...'); // Debug log
        router.push('/Users/Teacher/Home');
        router.refresh();
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.loginWrapper}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h1 className="text-2xl font-bold text-white mb-8 text-center">
              TEACHER LOGIN
            </h1>

            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <label htmlFor="teacherId" className="text-sm font-medium text-white">
                  TEACHER ID
                </label>
                <Input
                  id="teacherId"
                  name="teacherId"
                  type="text"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your teacher ID"
                  required
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                <Button 
                  type="submit" 
                  className={styles.loginButton} 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Log in'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className={styles.googleButton}
                  size="lg"
                  onClick={() => console.log('Google sign-in clicked')}
                  disabled={isLoading}
                >
                  <Earth className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </div>

              <button
                type="button"
                className={styles.forgotPassword}
                onClick={() => console.log('Forgot password clicked')}
                disabled={isLoading}
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