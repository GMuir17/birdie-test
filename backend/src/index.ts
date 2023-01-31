import * as dotenv from "dotenv";
import * as cors from "cors";

dotenv.config();

import app from "./application";

const port = process.env.PORT || 8000;

app.use(cors());

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});
