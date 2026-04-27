import {Router} from "express";
import {create, hello, close} from "../controllers/ticketController";

const router = Router();

router.post("/create", create);
router.post("/hello", hello);
router.put("/close", close);

export default router;

