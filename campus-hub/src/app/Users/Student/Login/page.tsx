'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Earth } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import styles from '../styles/login-page.module.css';

export default function LoginPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // 🔥 Debugging logs to confirm function is firing
    console.log("Submit button clicked!");

    // 🔥 Check if studentId and password exist before sending request
    console.log("Student ID:", studentId);
    console.log("Password:", password);

    if (!studentId || !password) {
        console.error("❌ Error: Student ID or password missing!");
        setErrorMessage("Student ID and password are required.");
        setIsLoading(false);
        return;
    }

    try {
        console.log("Trying to send request...");

        // Send request to backend
        const response = await fetch('http://localhost:3000/auth_student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',  // Important for cookies
            body: JSON.stringify({
                student_id: studentId,
                password
            }),
        });
        
        console.log("Response received!", response);

        // Handle HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if response is JSON before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid response format (not JSON)');
        }

        const data = await response.json();
        console.log("Data received from backend:", data);

        if (data.success) {
            console.log(`✅ Login successful for Student ID: ${data.student_id}`);

            // Remember Me functionality
            if (rememberMe) {
                localStorage.setItem('studentId', data.student_id);
            }

            
            // 🔥 Fix possible race condition by adding a small delay before navigation
            setTimeout(() => {
                router.push('/Users/Student/Home');
            }, 100);

        } else {
            console.warn("⚠️ Login failed:", data.message);
            setErrorMessage(data.message || 'Invalid ID or password. Please try again.');
        }

    } catch (error) {
        console.error("❌ Fetch failed:", error);
        setErrorMessage('Network error. Please try again. Server might be down.');
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
              STUDENT LOGIN
            </h1>

            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <label htmlFor="studentId" className="text-sm font-medium text-white">
                  STUDENT ID
                </label>
                <Input
                  id="studentId"
                  name="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your Student ID"
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