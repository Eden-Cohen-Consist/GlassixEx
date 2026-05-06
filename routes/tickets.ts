import { Router } from "express";
import { create, sendMessage, setState } from "../controllers/ticketController";

const router = Router();

router.post("/create", create);
router.post("/message/:ticketId", sendMessage);
router.put("/state/:ticketId", setState);

export default router;
