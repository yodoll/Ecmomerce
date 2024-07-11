import User from "../models/UserModel";
import bcrypt from "bcryptjs";
import { registerValidator, loginValidator } from "../validations/auth";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { getUserByEmail } from "../services/user";
import jwt from "jsonwebtoken";
class AuthController {
    async register(req, res, next) {
        try {
            const { email, username, password, confirmPassword } = req.body;
            const { error } = registerValidator.validate(req.body);
            if (error) {
                const errors = error.details.map((err) => err.message).join(", ");
                throw new ApiError(StatusCodes.BAD_REQUEST, errors);
            }
            const emailExist = await getUserByEmail(email);
            if (emailExist) throw new ApiError(StatusCodes.BAD_REQUEST, "Email da duoc dang ky");
            // Check if passwords match
            if (password !== confirmPassword) {
                throw new ApiError(StatusCodes.BAD_REQUEST, "Mật khẩu không khớp");
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const hashConfirmPassword = await bcrypt.hash(confirmPassword, 10);
            const user = await User.create({
                email,
                username,
                password: hashPassword,
                confirmPassword: hashConfirmPassword
            });
            // bda
            res.status(StatusCodes.OK).json({
                message: "Create Done",
                data: { ...user.toObject(), password: undefined, confirmPassword: undefined},
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { error } = loginValidator.validate(req.body);
            if (error) {
              const errors = error.details.map((err) => err.message).join(", ");
              throw new ApiError(StatusCodes.BAD_REQUEST, errors);
            }
            const checkUser = await getUserByEmail(email);
            if (!checkUser)
              throw new ApiError(StatusCodes.BAD_REQUEST, "Tai khoan ko hop le");
      
            const checkPassword = await bcrypt.compare(
              password,
              checkUser.password
            );
            if (!checkPassword)
              throw new ApiError(StatusCodes.BAD_REQUEST, "Tai khoan ko hop le");
      
            const token = jwt.sign({ id: checkUser._id }, "process.env.SECRET_KEY", {
              expiresIn: "1w",
            });
            res.status(StatusCodes.OK).json({
              message: "Login ok",
              user: { ...checkUser.toObject(), password: undefined, confirmPassword: undefined },
              token,
            });
          } catch (error) {
            next(error);
          }
        }
}

export default AuthController;
