import { userDtoResponse } from "../../application/dtos/userDtoResponse";
import jwt from "jsonwebtoken";

export default function generateToken(user: userDtoResponse): string {
  const secretKey = process.env.JWT_SECRET as string;
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    secretKey,
    {
      expiresIn: "1h",
    }
  );

  return token;
}
