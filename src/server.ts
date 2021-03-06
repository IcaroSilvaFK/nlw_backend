import express from "express";
import { router } from "./routes";

const app = express();
const port = 8080;

app.use(router);

app.listen(process.env.PORT || port, () => {
  console.log(
    `Server listen in uri = http://localhost:${process.env.PORT || port}`
  );
});
