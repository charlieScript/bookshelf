import joi from 'joi';
import { signPayload } from '../utils/jwt';
import { createUser, findUser } from '../services/user.service';
import { compare, hash } from "bcrypt";

// Interface for expected response
interface IHelperResponse {
  success: boolean;
  status: number;
  data?: { token: string, user: {}; };
  error?: string;
  message?: string;
}

export const signupController = async (email: string, password: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5),
  });

  const validationResult = validationSchema.validate({ email, password });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.details[0].message,
    };
  }

  // check for existing user
  const existingUser = await findUser(email);
  if (existingUser) {
    return {
      success: false,
      status: 400,
      error: 'Invalid username and/or password.',
    };
  }
  password = await hash(password, 10)
  const user = await createUser(email, password);
  return {
    success: true,
    status: 200,
    message: 'Account successfully created',
    data: { token: signPayload({ id: user.id, role: user.ROLE }), user },
  };
};


export const loginController = async (email: string, password: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(5),
  });

  const validationResult = validationSchema.validate({ email, password });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.message,
    };
  }

  const user = await findUser(email);
  
  if (!user) {
    return { success: false, status: 401, error: 'Incorrect username and/or password.' };
  }
  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, status: 401, error: 'Incorrect username and/or password.' };
  }

  return {
    success: true,
    status: 200,
    message: 'Login successful',
    data: { token: signPayload({ id: user.id, role: user.ROLE }), user: { email: user.email} },
  };
};