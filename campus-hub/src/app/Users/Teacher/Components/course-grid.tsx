import { useState, useEffect } from "react";
import { CourseCard } from "./course-card";

interface Instructor {
  image: string;
  name: string;
  initials: string;
}

interface Course {
  code: string;
  name: string;
  type: string;
  credit: number;
  instructors?: Instructor[];
  color: "blue" | "purple";
}

interface CourseGridProps {
  onCourseSelect: (course: { name: string, code: string }) => void;
}

const colors = ["blue", "purple"];

export function CourseGrid({ onCourseSelect }: CourseGridProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/attendance/teacher/courses", {
          credentials: "include", // Ensure session cookies are sent
        });
        const data = await response.json();
        setCourses(data.courses.map((course, index) => ({
          ...course,
          code: `CSE-${course.code}`, // Add "CSE-" prefix to course code
          instructors: course.instructors || [], // Ensure instructors is an array
          color: colors[index % colors.length],
        })));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <CourseCard key={i} {...course} onSelect={onCourseSelect} />
      ))}
    </div>
  );
}

