import type { Request, Response } from "express";
import {
  loginService,
  signUpService,
  type SignupInput,
  type LoginInput,
} from "./service";

export async function signUpController(req: Request, res: Response) {
  try {
    console.log("signUp:", req.body);
    const { name, email, password } = req.body as Partial<SignupInput>;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await signUpService({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    return res.status(201).json({ user });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Signup failed";
    // If email already exists
    if (msg.includes("already registered")) {
      return res.status(409).json({ message: msg });
    }
    console.error("Signup error:", err);
    return res.status(500).json({ message: msg });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    console.log("login:", req.body);
    const { email, password } = req.body as Partial<LoginInput>;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { token, user } = await loginService({
      email: email.trim(),
      password,
    });

    return res.status(200).json({ token, user });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Login failed";
    console.error("Login error:", err);
    // Invalid creds → 401
    if (msg === "Invalid email or password") {
      return res.status(401).json({ message: msg });
    }
    return res.status(500).json({ message: msg });
  }
}
