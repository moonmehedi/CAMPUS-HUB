import { Button } from "@/components/ui/button"
import { StudentRegistrationTable } from "./course-table"

interface CourseRegistrationAdminViewProps {
  isRegistrationLocked: boolean;
  setIsRegistrationLocked: (value: boolean) => void;
}

export function CourseRegistrationAdminView({ 
  isRegistrationLocked, 
  setIsRegistrationLocked 
}: CourseRegistrationAdminViewProps) {
  const handleLockRegistration = () => {
    setIsRegistrationLocked(true)
    // Here you would typically make an API call to update the registration status
  }

  return (
    <div>
      <h1 className="course-registration-admin-title">Course Registration Admin View</h1>
      <div className="flex justify-between items-center mb-4">
        <Button 
          onClick={handleLockRegistration} 
          disabled={isRegistrationLocked}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          {isRegistrationLocked ? "Registration Locked" : "Lock Registration"}
        </Button>
      </div>
      <StudentRegistrationTable isRegistrationLocked={isRegistrationLocked} />
    </div>
  )
}