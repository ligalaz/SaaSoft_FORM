import { AppAccountTypeEnum } from "./enums.ts";

export type AppLabelType = {
  text: string;
};
export type AppAccountType = AppAccountTypeEnum.LDAP | AppAccountTypeEnum.LOCAL;
export type AppStringOptType = string | null;
