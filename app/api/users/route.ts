import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import {IUser} from "@/types";


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectMongoDB();
    const users = await User.find();
    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
      await connectMongoDB();
      const body = JSON.parse(await req.text());
      const newUser = new User(body) as IUser;
      await newUser.save();
      return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
