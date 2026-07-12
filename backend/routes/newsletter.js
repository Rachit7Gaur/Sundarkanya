import express from "express";
import { subscribe, getSubscribers, deleteSubscriber } from "../controllers/newsletterController.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/subscribers", getSubscribers);
router.delete("/:id", deleteSubscriber);

export default router;
