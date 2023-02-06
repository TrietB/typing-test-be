const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require('bcryptjs')

const authController = {};

authController.emailLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email },'+password');
  console.log(user)
  if (!user) throw new AppError(400, "Invalid Credentials", "Login Error");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new AppError(400, "Wrong password", "Login Error");
  const accessToken = await user.generateToken();

  sendResponse(res, 200, true, { user, accessToken }, null, "Login Success");
});

module.exports = authController;
