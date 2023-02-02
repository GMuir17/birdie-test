import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import compression from "compression";
import { getCurrentInvoke } from "@vendia/serverless-express";

import { pingController } from "./controllers/ping";
import { eventsController } from "./controllers/events";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ejs = require("ejs").__express;
const app = express();
const router = express.Router();

app.set("view engine", "ejs");
app.engine(".ejs", ejs);

router.use(compression());
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://main.dt9wnu67adwnn.amplifyapp.com/"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(pingController);
app.use(eventsController);

app.get("/hello", (_req, res) => {
  return res.status(200).json({
    message: "Hello, World!",
  });
});

export default app;
