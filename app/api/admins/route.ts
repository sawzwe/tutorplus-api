import connectMongoDB from "@/libs/mongodb";
import Admin from "@/models/Admin";
import { NextResponse, NextRequest } from "next/server";
import { IAdmin } from "@/types";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectMongoDB();
    const admins = await Admin.find();

    if (admins.length === 0) {
      return NextResponse.json({ message: "No admins found" }, { status: 404 });
    }

    return NextResponse.json(
      { admins, message: "Admins fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectMongoDB();

    const bodyText = await req.text();
    const body = JSON.parse(bodyText);

    // Extract admin data from the parsed body
    const { username, email, password, profile, faculty,role } = body;

    // Create a new admin using the IAdmin interface
    const newAdmin: IAdmin = new Admin({
      username,
      email,
      password,
      profile,
      faculty,
      role,
    });

    await newAdmin.save();

    return new NextResponse(
      JSON.stringify({ message: "Admin created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create admin" }),
      { status: 500 }
    );
  }
}
