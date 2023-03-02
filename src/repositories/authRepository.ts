import { UserDBModel } from "../types/dbType";
import { authCollections, usersCollections } from "./db";

export const authRepository = {
  //GETUSER BY LOGINOREMAIL
  async findUserByLoginOrEmail(loginOrEmail: string) {
    const result: UserDBModel | null = await usersCollections.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });
    return result;
  },


  //FIND USER BY CONFIRM CODE
  async findUserByConfimationCode(code: string) {
    const result = await usersCollections.findOne({
      "emailConfimation.confimationCode": code,
    });
    return result;
  },
  //UPDATE CONFIRMATION
  async updateConfirmation(id: string) {
    const result = await usersCollections.updateOne(
      { id: id },
      { $set: { "emailConfimation.isConfirmed": true } }
    );
    return true;
  },
    //FIND USER BY CONFIRM CODE
    async findUserByEmail(email: string) {
      const result = await usersCollections.findOne({
        email: email,
      });
      return result;
    },


    //ADD REFRESH TOKEN
    async addRefreshToken(id: string, tokenRefresh: string){
      const result = await authCollections.updateOne({id:id},{$set:{id:tokenRefresh}},{upsert: true})
      return result.matchedCount ===1
    }
};
