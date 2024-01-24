import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['student', 'tutor'] },
    interests: { type: Object, required: true },
    profile: {
        firstName: String,
        lastName: String,
        // other personal details
    },
    tutorDetails: {
        teachingSubjects: [{
            facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
            courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty.courses' },
            subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty.courses.subjects' },
            classSchedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faculty.courses.subjects.classSchedule' }]
        }],
        availableTimes: [Date],
        skills: { type: Object, required: true },
        // other tutor-specific details
    },
    studentDetails: {
        enrolledCourses: [{
            facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
            courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty.courses' },
            subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty.courses.subjects' }
        }],
        // other student-specific details
    },
    // other common fields
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
