import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import { app_datasource } from "./datasource/database";
import multer from "multer";
import { User } from "./entities";
import session from "express-session";
import redis from "connect-redis";
import { createClient } from "redis";
import crypto from "crypto";
import {
  create_user,
  // fecthProducts,
  fetchProductsPagainate,
  searchProduct,
  user_login,
} from "./controllers";

dotenv.config();

async function main() {
  const app = express();
  const RedisClient = redis(session);
  let redisClient = createClient({ legacyMode: true });

  redisClient
    .connect()
    .then(() => console.log("connected successfull"))
    .catch((err) => console.error(err));

  let session_f: session.SessionOptions = {
    store: new RedisClient({ client: redisClient }),
    secret: crypto.randomBytes(20).toString("hex"),
    cookie: { secure: false, maxAge: 1000 * 5 },
    resave: false,
    name: "uid",
    saveUninitialized: false,
    // genid:
  };

  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
  }

  await app_datasource
    .initialize()
    .then(() => console.log("database connected."))
    .catch((err) => console.error(err));
  app.set("trust proxy", 1);
  app.use(session(session_f));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Successfully");
  });
  const manager = app_datasource.manager;

  // User API
  app.post("/api/user", multer().none(), create_user);
  app.get("/api/users", async (req, res) => {
    const users = await manager.find(User);
    if (!users) throw new Error("No Data Found");
    let results = {} as any;
    results.result = users;
    res.status(200).send(results);
  });

  // Product API
  // app.get("/api/products", multer().none(), fecthProducts);
  app.get("/api/products", multer().none(), fetchProductsPagainate);
  app.get("/api/products/search", multer().none(), searchProduct);

  // Authentication Login/Logout
  app.post("/login", multer().none(), user_login);
  app.post("/logout", async (req: Request, res: Response) => {
    req.session.destroy;
    res.send("done");
  });

  app.listen(process.env.PORT || 4000, () =>
    console.log(`http://localhost:4000`)
  );
}

main();
