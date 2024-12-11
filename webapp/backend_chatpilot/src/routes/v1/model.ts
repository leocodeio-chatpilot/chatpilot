import { Router } from "express";
import {
  saveApikey,
  getApiByUserId,
  queryModelApi,
} from "../../controllers/model";
import { isAuthenticated } from "../../middleware/user";

const modelRouter = Router();

modelRouter.post("/add-api", isAuthenticated, saveApikey);
modelRouter.get("/get-api/:userId", isAuthenticated, getApiByUserId);
modelRouter.post("/query", isAuthenticated, queryModelApi);

export default modelRouter;
