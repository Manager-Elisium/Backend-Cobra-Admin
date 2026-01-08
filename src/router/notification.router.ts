import express from "express";
import { deleteNotification, getNotification, insertNotification, listNotification } from "src/controller/notification.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();
// Admin
router.post("/create", verifyAccessToken, insertNotification);
router.get("/paginate/list", verifyAccessToken, listNotification);
router.get("/:id", verifyAccessToken, getNotification);

router.delete("/delete/:id", verifyAccessToken, deleteNotification);

export { router as NotificationRouter };