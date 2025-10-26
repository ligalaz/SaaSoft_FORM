import type {
  AppAccountType,
  AppLabelType,
  AppStringOptType,
} from "./types.ts";

export interface IAccount {
  labels: Array<AppLabelType>;
  type: AppAccountType;
  login: string;
  password: AppStringOptType;
  hasSaved: boolean;
  id: number;
}
