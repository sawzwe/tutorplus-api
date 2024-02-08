import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import {IUser} from "@/types";


// Define the CORS headers with an index signature
const headers: { [key: string]: string } = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*', // Adjust this to your client's URL for better security
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
};


export function middleware(req: NextRequest) {
  // If the request method is OPTIONS, return a simple response with the CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('OK', { headers });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const users = await User.find();
    if (users.length === 0) {
      const response = new Response(JSON.stringify({ message: "No users found" }), { status: 404 });
      response.headers.set('Content-Type', 'application/json');
      // Set CORS headers
      Object.keys(headers).forEach(key => response.headers.set(key, headers[key]));
      return response;
    }

    const response = new Response(JSON.stringify(users), { status: 200 });
    response.headers.set('Content-Type', 'application/json');
    // Set CORS headers
    Object.keys(headers).forEach(key => response.headers.set(key, headers[key]));
    return response;
  } catch (error) {
    console.error("Error:", error);
    const response = new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
    response.headers.set('Content-Type', 'application/json');
    // Set CORS headers
    Object.keys(headers).forEach(key => response.headers.set(key, headers[key]));
    return response;
  }
}

export async function POST(req: NextRequest) {
  // Create a new response object
  let response = new NextResponse();

  // Set CORS headers
  Object.keys(headers).forEach((key) => {
    response.headers.set(key, headers[key]);
  });

  try {
    await connectMongoDB();
    const body = JSON.parse(await req.text());
    const newUser = new User(body) as IUser; 
    await newUser.save();

    // Set the response body and status code
    response = NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    // Set the error response body and status code
    response = NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }

  // Return the response with the headers already set
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
