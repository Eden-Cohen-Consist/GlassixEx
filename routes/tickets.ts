import {Router} from "express";
import {create, hello, close} from "../controllers/ticketController";

const router = Router();

// ISSUE (security): No auth middleware or per-route authorization checks before ticket operations.
router.post("/create", create);
router.post("/hello", hello);
router.put("/close", close);

export default router;

