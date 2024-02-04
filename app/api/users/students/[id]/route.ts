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

    const bodyText = await req.text();
    const body = JSON.parse(bodyText);

    const { tutorDetails, ...updateFields } = body;

    console.log(`Updating student with ID: ${id}`, updateFields); // Log the ID and update body without tutor details

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedUser) {
      console.log(`Student not found with ID: ${id}`); // Log if not found
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    console.log(`Student updated successfully:`, updatedUser); // Log the updated document
    return NextResponse.json({ user: updatedUser, message: "Student updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating student:", error); // Log detailed error
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectMongoDB();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Student deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
  }
}



