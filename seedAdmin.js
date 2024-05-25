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
  const hashedPassword = await bcrypt.hash("123123", salt);

  const admin = new User({
    username: "admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "admin",
  });

  await admin.save();
  console.log("Admin user created");
  mongoose.disconnect();
};

seedAdmin();
