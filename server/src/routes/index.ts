import { apiRoutes } from "./api";
import { Router } from "express";

const routes = Router();
routes.use("/api", apiRoutes);

export default routes;
