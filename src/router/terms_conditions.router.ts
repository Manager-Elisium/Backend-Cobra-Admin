import express from "express";
import { Delete, insert, list, update, allDataList } from "src/controller/terms_condition.controller";
import { TermsAndConditionsValidation } from "src/validator/terms_condition.validation"
import { validate } from "src/services/validation.services";
let router = express.Router();

// Admin
router.post("/create", insert, TermsAndConditionsValidation(), validate);
router.put("/update/:id", update, TermsAndConditionsValidation(), validate);
router.get("/paginate/list", allDataList);
router.delete("/delete/:id", Delete);

// Unity
router.get("/list", list);

export { router as TermsAndConditionRouter };