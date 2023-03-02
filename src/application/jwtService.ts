import jwt from "jsonwebtoken";
import { setting } from "../settings";

export const jwtService = {
  async createJWTAccesToken(user:any) {
    const token = jwt.sign({ userId: user.id }, setting.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  }
  ,

  async createJWTRefreshToken (user:any) {
    const token = jwt.sign({ userId: user.id }, setting.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  }
  ,
  async getUserIdByToken(token:string) {
    try {
      const result:any = jwt.verify(token, setting.JWT_SECRET);
      return result.userId;
    } catch (error) {
      return null;
    }
  },
};
