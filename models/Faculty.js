import mongoose from 'mongoose';

const classScheduleSchema = new mongoose.Schema({
    dayOfWeek: { type: String, required: true }, // e.g., "Tuesday"
    startTime: { type: Date, required: true }, // e.g., 9 AM
    endTime: { type: Date, required: true }, // e.g., 12 PM
});

const subjectSchema = new mongoose.Schema({
    subjectCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tutors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    classSchedule: [classScheduleSchema],
    // other subject-specific fields
});

const courseSchema = new mongoose.Schema({
    coursename: { type: String, required: true, unique: true },
    subjects: [subjectSchema],
    creationDate: { type: Date, default: Date.now },
    schedule: {
        startDate: Date,
        endDate: Date,
        // other overall course scheduling details
    },
    // other course-specific fields
});

const facultySchema = new mongoose.Schema({
    facultyName: { type: String, required: true, unique: true },
    courses: [courseSchema],
    // other faculty-specific fields
});

const Faculty = mongoose.models.Faculty || mongoose.model('Faculty', facultySchema);

export default Faculty;
