import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(`Database connection failed: `, err));
};

export default connectDb;
