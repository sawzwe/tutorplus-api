import mongoose, { Document } from 'mongoose';

interface IFaculty extends Document {
    facultyName: string;
    courses: {
        coursename: string;
        subjects: {
            subjectCode: string;
            name: string;
            tutors: mongoose.Types.ObjectId[];
            classSchedule: {
                dayOfWeek: string;
                startTime: Date;
                endTime: Date;
            }[];
        }[];
        creationDate: Date;
        schedule: {
            startDate: Date;
            endDate: Date;
        };
    }[];
}

export default IFaculty;
