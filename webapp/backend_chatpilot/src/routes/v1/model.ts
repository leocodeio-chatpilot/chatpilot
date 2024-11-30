import { Router } from "express";
import { saveApikey } from "../../controllers/model";
import { isAuthenticated } from "../../middleware/user";

const modelRouter = Router();

modelRouter.post("/api", isAuthenticated, saveApikey);

export default modelRouter;
