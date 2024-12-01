import { Router } from "express";
import { saveApikey, getApiByUserId } from "../../controllers/model";
import { isAuthenticated } from "../../middleware/user";

const modelRouter = Router();

modelRouter.post("/add-api", isAuthenticated, saveApikey);
modelRouter.get("/get-api/:userId", isAuthenticated, getApiByUserId);

export default modelRouter;
