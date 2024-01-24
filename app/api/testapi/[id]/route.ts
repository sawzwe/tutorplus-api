// import connectMongoDB from "@/libs/mongodb";
// import User from "@/models/User";
// import { NextRequest, NextResponse } from 'next/server'


// export async function GET(req : NextRequest,{ params }: { params: { id: number } }){
//   const { id } = params;
//   try {
//     await connectMongoDB();

//     const user = await User.findOne({ _id: id });
//     return NextResponse.json({ user, message: "User fetched successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
//   }
// }



