import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const {
      MONGODB_USER,
      MONGODB_PASSWORD,
      MONGODB_URL,
      MONGODB_DB
    } = process.env;

    if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
      throw new Error('Missing MongoDB environment variables');
    }

    const mongoUri = `mongodb+srv://${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(MONGODB_PASSWORD)}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(mongoUri);

    console.log('✅ Successfully connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
