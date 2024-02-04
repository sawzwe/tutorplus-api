import mongoose, { Document } from 'mongoose';

interface IAdmin extends Document {
  username: string;
  email: string;
  role: 'admin';
  profile: {
    firstName?: string;
    lastName?: string;
    // other personal details as needed
  };
  faculty: string;
}

export default IAdmin;
