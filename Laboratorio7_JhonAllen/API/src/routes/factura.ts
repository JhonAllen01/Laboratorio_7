import { Router } from "express";
import FacturaController from "../controller/FacturaController";

const routes = Router();

routes.get("", FacturaController.getAll);

export default routes;
