import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { query } from "../db/config";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

export const signUpService = async (
  signupInput: SignupInput
): Promise<AuthUser> => {
  const { name, email, password } = signupInput;
  const existing = await query("SELECT id FROM users WHERE email=$1", [email]);

  if (existing.rows.length > 0) {
    throw new Error("Email is already registered");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await query(
    `INSERT INTO users (name,email,password_hash) VALUES ($1,$2,$3) RETURNING id, name,email,is_admin`,
    [name, email, passwordHash]
  );

  return result.rows[0] as AuthUser;
};

export const loginService = async (loginInput: LoginInput) => {
  const { email, password } = loginInput;

  const result = await query(
    `SELECT id , name ,email,password_hash,is_admin FROM users WHERE email=$1`,
    [email]
  );
  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const userRow = result.rows[0];

  const isMatch = await bcrypt.compare(password, userRow.password_hash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const user: AuthUser = {
    id: userRow.id,
    name: userRow.name,
    email: userRow.email,
    is_admin: userRow.is_admin,
  };

  const token = jwt.sign(
    { userId: user.id, email: user.email, is_admin: user.is_admin },
    JWT_SECRET
  );

  return { token, user };
};
