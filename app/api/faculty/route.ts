import connectMongoDB from "@/libs/mongodb";
import Faculty from "@/models/Faculty";
import { NextResponse, NextRequest } from "next/server";
import IFaculty from "@/types/IFaculty"; // Adjust the import path


// Get all faculties
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        await connectMongoDB();
        const faculties = await Faculty.find();
        return NextResponse.json(faculties, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to fetch faculties" }, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectMongoDB();
        const body = JSON.parse(await req.text());
        const newFaculty = new Faculty(body) as IFaculty;
        await newFaculty.save();
        return NextResponse.json({ message: "Faculty created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to create faculty" }, { status: 500 });
    }
}
