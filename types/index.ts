import mongoose, { Document } from 'mongoose';

// Define an interface for the User schema
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'student' | 'tutor';
  interests: Record<string, any>; // Adjust the type as per your data structure
  profile: {
    firstName?: string;
    lastName?: string;
    // Define other personal details as needed
  };
  tutorDetails: {
    teachingSubjects: {
      facultyId: mongoose.Types.ObjectId;
      courseId: mongoose.Types.ObjectId;
      subjectId: mongoose.Types.ObjectId;
      classSchedules: mongoose.Types.ObjectId[];
    }[];
    availableTimes: Date[];
    skills: Record<string, any>; // Adjust the type as per your data structure
    // Define other tutor-specific details as needed
  };
  studentDetails: {
    enrolledCourses: {
      facultyId: mongoose.Types.ObjectId;
      courseId: mongoose.Types.ObjectId;
      subjectId: mongoose.Types.ObjectId;
    }[];
    // Define other student-specific details as needed
  };
  // Define other common fields as needed
}

export default IUser;
