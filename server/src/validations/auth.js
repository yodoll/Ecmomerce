import Joi from 'joi';

const registerValidator = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().messages({
        "string.email": "Ko dung dinh dang email",
      }),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      role: Joi.string(),
}).options({
    abortEarly: false
})
const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).options({
    abortEarly: false,
  });

export { registerValidator, loginValidator };