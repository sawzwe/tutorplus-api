import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import IUser from "@/types";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectMongoDB();
    const users = await User.find();

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json({ users, message: "Users fetched successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
      await connectMongoDB();
  
      const bodyText = await req.text();
      const body = JSON.parse(bodyText);
  
      // Extract user data from the parsed body
      const {
        username,
        email,
        password,
        role,
        interests,
        profile,
        tutorDetails,
        studentDetails,
      } = body;
  
      // Create a new user using the IUser interface
      const newUser: IUser = new User({
        username,
        email,
        password,
        role,
        interests,
        profile,
        tutorDetails,
        studentDetails,
      });
  
      await newUser.save();
  
      return new NextResponse(JSON.stringify({ message: "User created successfully" }), { status: 201 });
    } catch (error) {
      console.error("Error:", error);
      return new NextResponse(JSON.stringify({ error: "Failed to create user" }), { status: 500 });
    }
  }