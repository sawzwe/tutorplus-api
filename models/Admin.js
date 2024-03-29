import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['admin'] },
  profile: {
    firstName: String,
    lastName: String,
    // other personal details
  },
  faculty: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;
