import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import {IUser} from "@/types";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
      await connectMongoDB();
      const students = await User.find({ role: 'tutor' });
      if (students.length === 0) {
        return NextResponse.json({ message: "No tutors found" }, { status: 404 });
      }
      return NextResponse.json(students, { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "Failed to fetch tutor" }, { status: 500 });
    }
  }
  
  export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectMongoDB();
        const body = JSON.parse(await req.text());
        const newTutor = new User(body) as IUser;
        await newTutor.save();
        return NextResponse.json({ message: "Tutor created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to create tutor" }, { status: 500 });
    }
  }
  