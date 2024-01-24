"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define a type or interface for the user data
interface User {
  _id: string;
  username: string;
  email: string;
  // Define other properties as needed
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Function to fetch all users
    async function fetchUsers() {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.users); // Assuming the response structure contains a "users" property
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    // Call the fetchUsers function
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>List of Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
