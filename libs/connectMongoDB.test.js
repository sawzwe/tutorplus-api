import connectMongoDB from './connectMongoDB';

describe('MongoDB Connection', () => {
  beforeAll(async () => {
    // Set up any necessary test environment variables here
    process.env.MONGODB_URI = 'mongodb+srv://arashiai:i8mlPLWwoE0JTa0R@cluster0.ls6l9fc.mongodb.net/'; // Replace with your MongoDB URI
  });

  afterAll(async () => {
    // Close the MongoDB connection after all tests
    await mongoose.connection.close();
  });

  it('should connect to MongoDB', async () => {
    // Arrange: Set up any necessary test data or mocks here

    // Act: Call the connectMongoDB function
    await connectMongoDB();

    // Assert: Check if the connection is successful
    expect(mongoose.connection.readyState).toBe(1); // 1 means connected
  });
});
