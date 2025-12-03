import express from "express";
import routes from "./interfaces/http/routes";
import { errorHandler } from "./interfaces/middleware/errorHandler";
import { notFound } from "./interfaces/middleware/notFound";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
