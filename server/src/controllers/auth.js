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
            if (emailExist) res.status(400).json({message: "Email already exists!"})
            // Check if passwords match
            if (password !== confirmPassword) {
                return res.status(400).json({
                  message: "Password is no valid!"
                })
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const hashConfirmPassword = await bcrypt.hash(confirmPassword, 10);
            const user = await User.create({
                email,
                username,
                password: hashPassword,
                confirmPassword: hashConfirmPassword,
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
            if (!checkUser){
              // throw new ApiError(StatusCodes.BAD_REQUEST, "Tai khoan ko hop le");
              return res.status(400).json({
                message: "Email not exists!"
              })
            }
            const checkPassword = await bcrypt.compare(
              password,
              checkUser.password
            );
            if (!checkPassword){
                return res.status(400).json({
                  message: "Password is incorrect!"
                });
            }
              
      
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
