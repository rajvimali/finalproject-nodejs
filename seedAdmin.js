const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash('admin@123', salt);

  const admin = new User({
    username: "admin",
    email: "admin@gmail.com",
    password: "admin@123",
    role: "admin",
  });

  await admin.save();
  console.log("User created");
  mongoose.disconnect();
};

seedAdmin();
