import { Router } from "express";
import { testing } from "../controllers";
import { getAllPlans } from "../controllers";

const router = Router();

router.route('/test')
    .all(testing);

router.route('/plans')
    .get(getAllPlans);

export { router as mainRouter };