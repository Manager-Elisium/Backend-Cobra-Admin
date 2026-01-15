import express from "express";
import { deleteBugTicket, getBugTicket, insertBugTicket, listBugTicket, updateBugTicket } from "src/controller/bug-ticket.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();

router.post("/create", verifyAccessToken, insertBugTicket);
router.get("/paginate/list", verifyAccessToken, listBugTicket);
router.get("/list", verifyAccessToken, listBugTicket);
router.get("/:id", verifyAccessToken, getBugTicket);
router.put("/update/:id", verifyAccessToken, updateBugTicket);
router.delete("/delete/:id", verifyAccessToken, deleteBugTicket);

export { router as BugTicketRouter };
