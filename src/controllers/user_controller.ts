import { Request, Response } from "express";
import { app_datasource } from "../datasource/database";
import { User } from "../entities";
import { TypeOrmFail, UserType } from "../type/type";
import { validateOrReject } from "class-validator";
import bcrypt from "bcrypt";
const manager = app_datasource.manager;

export const create_user = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password }: UserType = req.body;
  const hasPassword = await bcrypt.hash(password, 10);

  const user = manager.create(User, {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hasPassword,
  });

  const validate = await validateOrReject(user, {
    validationError: { target: false, value: true },
  })
    .then(async () => {
      await manager
        .save(user)
        .then((data: Omit<User, "password">) => res.status(200).json(data))
        .catch((err: TypeOrmFail) =>
          res.status(400).json({
            code: err.errno,
            message: err.sqlMessage,
          })
        );
    })
    .catch((err) => err.length > 0 && res.status(401).send(err));

  return validate;
};

export const user_login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await manager.findOne(User, { where: { email } });
  if (!user) {
    throw new Error("User not found.");
  }

  const hasPassword = await bcrypt.compare(password, user.password);

  if (!hasPassword) {
    throw new Error("Incorrect password.");
  }

  (req.session as any).userId = user.id;

  return res.status(200).send({
    email: user.email,
    user_name: user.user_name,
  });
};
