import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "@/types";

// Define the CORS headers
const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*', // Adjust this to match your client's URL for better security
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
};

function setCorsHeaders(response: NextResponse) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

export async function GET(req: NextRequest) {
  let response: NextResponse;

  try {
    await connectMongoDB();
    const users = await User.find();
    if (users.length === 0) {
      response = new NextResponse(JSON.stringify({ message: "No users found" }), { status: 404 });
    } else {
      response = new NextResponse(JSON.stringify(users), { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    response = new NextResponse(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }

  setCorsHeaders(response);
  return response;
}

export async function POST(req: NextRequest) {
  let response: NextResponse;

  try {
    await connectMongoDB();
    const body = JSON.parse(await req.text());
    const newUser = new User(body) as IUser;
    await newUser.save();
    response = new NextResponse(JSON.stringify({ message: "User created successfully" }), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    response = new NextResponse(JSON.stringify({ error: "Failed to create user" }), { status: 500 });
  }

  setCorsHeaders(response);
  return response;
}


// export async function GET(req: NextRequest, res: NextResponse) {
//   // await cors(req, res);
//   try {
//     await connectMongoDB();
//     const users = await User.find();
//     if (users.length === 0) {
//       return NextResponse.json({ message: "No users found" }, { status: 404 });
//     }
//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     // console.error("Stack:", error.stack);
//     return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
//   }
// }

// export async function POST(req: NextRequest, res: NextResponse) {
//   // await cors(req, res);
//   try {
//       await connectMongoDB();
//       const body = JSON.parse(await req.text());
//       const newUser = new User(body) as IUser;
//       await newUser.save();
//       return NextResponse.json({ message: "User created successfully" }, { status: 201 });
//   } catch (error) {
//       console.error("Error:", error);
//       return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
//   }
// }
