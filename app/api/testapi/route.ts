// import connectMongoDB from "@/libs/mongodb";
// import User from "@/models/User";
// import { NextResponse, NextRequest } from "next/server";

// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     await connectMongoDB();
//     const users = await User.find();

//     if (users.length === 0) {
//       return NextResponse.json({ message: "No users found" }, { status: 404 });
//     }

//     return NextResponse.json({ users, message: "Users fetched successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
//   }
// }
