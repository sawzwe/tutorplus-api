import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req : NextRequest,{ params }: { params: { id: number } }){
  const { id } = params;
  try {
    await connectMongoDB();

    const user = await User.findOne({ _id: id });
    return NextResponse.json({ user, message: "User fetched successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectMongoDB();

    // Read and parse the request body
    const bodyText = await req.text();
    const body = JSON.parse(bodyText);

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser, message: "User updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectMongoDB();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}



