# CAMPUS HUB 🎓

A comprehensive educational management platform designed to streamline academic operations for students, teachers, and administrators. Built with modern web technologies to provide an intuitive and efficient campus management experience.

## 🌟 Overview

Campus Hub is a full-stack web application that digitizes and automates various academic processes in educational institutions. The platform serves three main user roles with tailored interfaces and functionalities to manage their respective academic responsibilities efficiently.

## ✨ Key Features

### 👨‍🎓 Student Portal
- **Personal Dashboard**: Comprehensive student profile with academic information and quick access to all features
- **Notice Board**: Real-time access to announcements from teachers and administrators
- **Course Registration**: Select and manage course enrollments for each academic semester
- **Scholarship Application**: Online scholarship application system with status tracking and document upload
- **Leave Application**: Submit leave requests with automated approval workflow
- **AI Course Advisor**: Intelligent course recommendation system based on academic performance
- **Exam Scheduler**: View upcoming exams, academic calendar, and exam preparation resources
- **Community Chat**: Real-time messaging platform for students and alumni networking
- **AI Chatbot**: 24/7 academic support with trainable responses for common queries
- **Student Directory**: Browse and connect with fellow students across different departments

### 👨‍🏫 Teacher Portal
- **Teacher Dashboard**: Centralized view of all teaching responsibilities and student management
- **Notice Management**: Create, edit, and distribute notices to specific student groups or departments
- **Attendance Tracking**: Digital attendance system with bulk operations and analytics
- **Exam Management**: Schedule examinations, manage exam halls, and track exam logistics
- **Scholarship Review**: Evaluate and approve student scholarship applications
- **Leave Request Processing**: Review and approve/reject student leave applications
- **Course Management**: Oversee course enrollments and student progress tracking

### 👨‍💼 Administrator Portal
- **Admin Dashboard**: Complete system oversight with analytics and performance metrics
- **Student Management**: Comprehensive CRUD operations for student records with advanced search
- **System-wide Notices**: Broadcast important announcements across the entire platform
- **Course Administration**: Manage course catalog, prerequisites, and enrollment policies
- **Scholarship Oversight**: Final approval authority for scholarship disbursements
- **Leave Administration**: System-wide leave policy management and reporting
- **AI Chatbot Training**: Train the AI assistant with new Q&A pairs and CSV batch uploads
- **User Role Management**: Control access permissions and system security

## 🏗️ System Architecture

### Project Structure
```
CAMPUS-HUB/
├── campus-hub-FrontEnd/         # Next.js Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── Users/
│   │   │   │   ├── Student/     # Student-specific pages and components
│   │   │   │   ├── Teacher/     # Teacher-specific pages and components
│   │   │   │   └── Admin/       # Administrator pages and components
│   │   │   └── api/             # API routes and middleware
│   │   ├── components/          # Reusable UI components
│   │   └── config/              # Configuration files
│   ├── public/                  # Static assets and images
│   └── package.json
├── campus-hub-backend/          # Express.js Backend API
│   ├── src/
│   │   ├── routes/              # API endpoints for different modules
│   │   ├── middleware/          # Authentication and validation middleware
│   │   └── utils/               # Utility functions and helpers
│   ├── server.js                # Main server entry point
│   └── connection.js            # Database connection configuration
├── campushub-chatterbot/        # Django AI Chatbot Service
│   ├── chatbot_project/         # Django project configuration
│   ├── blog/                    # Chatbot logic and training modules
│   ├── manage.py                # Django management commands
│   └── requirements.txt         # Python dependencies
└── README.md                    # Project documentation
```

## 🛠️ Technology Stack

### Frontend Technologies
- **Framework**: Next.js 14 with App Router for modern React development
- **Styling**: Tailwind CSS for utility-first styling + CSS Modules for component-specific styles
- **UI Library**: NextUI components with custom design system
- **Icons**: Lucide React and Heroicons for consistent iconography
- **Animations**: Framer Motion for smooth transitions and interactions
- **Type Safety**: TypeScript for enhanced development experience
- **State Management**: React Hooks and Context API for local and global state

### Backend Technologies
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Supabase as Backend-as-a-Service
- **Authentication**: Session-based authentication with role-based access control
- **Real-time Features**: WebSocket implementation for live chat functionality
- **File Handling**: Multipart form data processing for file uploads
- **API Design**: RESTful API architecture with proper error handling

### AI/ML Components
- **Framework**: Django (Python) for AI chatbot service
- **NLP Processing**: Custom natural language processing for query understanding
- **Training System**: CSV batch upload and individual Q&A training capabilities
- **Response Generation**: Context-aware response system with learning capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher)
- Python (v3.8 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation & Setup

1. **Clone the Repository**
```bash
git clone https://github.com/moonmehedi/CAMPUS-HUB.git
cd CAMPUS-HUB
```

2. **Frontend Setup**
```bash
cd campus-hub-FrontEnd
npm install
```

3. **Backend Setup**
```bash
cd ../campus-hub-backend
npm install
```

4. **AI Chatbot Setup**
```bash
cd ../campushub-chatterbot
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic
```

5. **Environment Configuration**

Create `.env.local` in `campus-hub-FrontEnd/`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CHATBOT_URL=http://localhost:8000
```

Create `.env` in `campus-hub-backend/`:
```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_secure_session_secret
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

Create `.env` in `campushub-chatterbot/`:
```env
DEBUG=True
SECRET_KEY=your_django_secret_key
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_ENGINE=django.db.backends.sqlite3
```

6. **Start Development Servers**

**Terminal 1 - Frontend (Port 3000):**
```bash
cd campus-hub-FrontEnd
npm run dev
```

**Terminal 2 - Backend API (Port 3001):**
```bash
cd campus-hub-backend
npm start
```

**Terminal 3 - AI Chatbot (Port 8000):**
```bash
cd campushub-chatterbot
python manage.py runserver
```

7. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- AI Chatbot API: http://localhost:8000

## 📊 Database Schema & Architecture

### Core Database Tables
- **Students**: Personal information, academic records, enrollment status
- **Teachers**: Faculty profiles, department assignments, course responsibilities
- **Administrators**: System admin credentials and permission levels
- **Notices**: Announcements with role-based visibility and priority levels
- **Courses**: Course catalog, prerequisites, credit hours, and enrollment limits
- **Scholarships**: Application workflow, eligibility criteria, and approval status
- **Leave Requests**: Request types, approval chains, and status tracking
- **Messages**: Community chat system with real-time messaging capabilities
- **Attendance**: Class attendance records with timestamp and verification
- **Exam Schedules**: Examination timetables, venues, and logistics management

### API Endpoints Structure
- **Authentication**: `/api/auth/` - Login, logout, session management
- **Students**: `/api/students/` - Student CRUD operations and profile management
- **Teachers**: `/api/teachers/` - Teacher-specific functionalities
- **Notices**: `/api/notices/` - Notice creation, editing, and distribution
- **Courses**: `/api/courses/` - Course management and registration
- **Scholarships**: `/api/scholarships/` - Scholarship application workflow
- **Attendance**: `/api/attendance/` - Attendance tracking and reporting
- **Chat**: `/api/messages/` - Real-time messaging system
- **Chatbot**: `/api/chatbot/` - AI chatbot integration and training

## 🔐 Security Implementation

### Authentication & Authorization
- Session-based authentication with secure cookie management
- Role-based access control (RBAC) for different user types
- Password hashing with bcrypt for secure credential storage
- CSRF protection for all state-changing operations
- Input validation and sanitization to prevent injection attacks

### Data Protection
- SQL injection prevention through parameterized queries
- XSS protection with proper data escaping
- File upload validation and secure storage
- Rate limiting for API endpoints to prevent abuse
- Secure session configuration with appropriate timeouts

## 🎯 Key Features Implementation

### Real-time Communication
- WebSocket-based chat system for instant messaging
- Live notification updates for important announcements
- Real-time attendance tracking during class sessions
- Push notifications for critical updates (planned)

### AI-Powered Features
- Intelligent course recommendation based on academic history
- Natural language processing for chatbot queries
- Automated response generation with context awareness
- Continuous learning from user interactions and feedback

### User Experience Enhancements
- Responsive design optimized for all device sizes
- Progressive Web App (PWA) capabilities for mobile users
- Offline functionality for critical features
- Accessibility compliance with WCAG 2.1 guidelines
- Dark/light theme support with user preferences

## 🔧 Development Guidelines

### Code Quality Standards
- ESLint and Prettier configuration for consistent code formatting
- TypeScript strict mode for enhanced type safety
- Component-based architecture with reusable design patterns
- Comprehensive error handling and user feedback systems
- Performance optimization with lazy loading and code splitting

### Testing Strategy
- Unit tests for critical business logic components
- Integration tests for API endpoints and database operations
- End-to-end testing for complete user workflows
- Performance testing for scalability validation

## 📈 Future Roadmap

### Short-term Enhancements (3-6 months)
- [ ] Mobile application development (React Native)
- [ ] Advanced analytics dashboard with data visualization
- [ ] Email notification system integration
- [ ] Document management system with version control
- [ ] Advanced reporting features with export capabilities

### Long-term Vision (6-12 months)
- [ ] Integration with external academic management systems
- [ ] Machine learning-powered academic performance predictions
- [ ] Multi-language support for international institutions
- [ ] Advanced AI capabilities with voice interaction
- [ ] Blockchain-based credential verification system

### Scalability Improvements
- [ ] Microservices architecture migration
- [ ] Container deployment with Docker and Kubernetes
- [ ] CDN integration for global content delivery
- [ ] Database optimization and sharding strategies
- [ ] Load balancing and auto-scaling implementation

## 👥 Development Team & Contributors

This project is the result of collaborative effort by talented developers:

- **Sadia Jahan Moon** - Automated Course Advisor, Attendance System, Leave Application
- **Md. Mehedi Hasan Moon** - AI Chatbot, Profile Management, Attendance Tracking, Full-stack Development
- **Maisha Nanjeeba** - Exam Scheduling, User Authentication, UI/UX Design
- **Md. Rubaet Kabir Zishan** - Scholarship Application System, Course Registration
- **Arqam Bin Almas** - Notice Board, Community Chat, Student Profile Management
- **ASM Jobayer Hossain** - Admin Management, User Authentication System

## 📞 Support & Contact

For technical support, feature requests, or bug reports:
- Create an issue in the GitHub repository
- Email: support@campushub.edu (placeholder)
- Documentation: Comprehensive guides available in `/docs` folder

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for detailed terms and conditions.

## 🙏 Acknowledgments

- **Next.js Team** for the outstanding React framework and development experience
- **Supabase** for providing excellent Backend-as-a-Service infrastructure
- **Open Source Community** for the incredible libraries and tools that made this project possible
- **Educational Institutions** who provided insights and requirements for real-world applicability

---

**Campus Hub** - Transforming Education Through Technology 🚀

*Built with ❤️ for the future of educational management*

