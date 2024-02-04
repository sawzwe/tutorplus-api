import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import {IUser} from "@/types";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
      await connectMongoDB();
      const students = await User.find({ role: 'student' });
      if (students.length === 0) {
        return NextResponse.json({ message: "No students found" }, { status: 404 });
      }
      return NextResponse.json(students, { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }
  }

  export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectMongoDB();
        const body = JSON.parse(await req.text());
  
        if (body.role === 'student') {
            body.tutorDetails = {  
                teachingSubjects: [],
                availableTimes: [],
                skills: {}
            };
        }
  
        const newUser = new User(body);
        await newUser.save();
        return NextResponse.json({ message: "Student created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
    }
  }
  
  