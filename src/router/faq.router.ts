import express from "express";
import { insert, list, allDataList, update, Delete } from "src/controller/faq.controller";
import { validate } from "src/services/validation.services";
import { FaqValidation } from "src/validator/faq.validation";

let router = express.Router();
// Admin
router.post("/create", FaqValidation(), validate, insert);
router.get("/paginate/list", allDataList);
router.put("/update/:id", FaqValidation(), validate, update);
router.delete("/delete/:id", Delete);
// Unity
router.get("/list", list);

export { router as FaqRouter };