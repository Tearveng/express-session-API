export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export interface ValidatorOptions {
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
  groups?: string[];
  dismissDefaultMessages?: boolean;
  validationError?: {
    target?: boolean;
    value?: boolean;
  };
  forbidUnknownValues?: boolean;
  stopAtFirstError?: boolean;
}

export type TypeOrmFail = {
  errno: number;
  sqlMessage: string;
};
