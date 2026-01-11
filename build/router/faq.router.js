"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRouter = void 0;
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("src/controller/faq.controller");
const validation_services_1 = require("src/services/validation.services");
const faq_validation_1 = require("src/validator/faq.validation");
let router = express_1.default.Router();
exports.FaqRouter = router;
// Admin
router.post("/create", (0, faq_validation_1.FaqValidation)(), validation_services_1.validate, faq_controller_1.insert);
router.get("/paginate/list", faq_controller_1.allDataList);
router.put("/update/:id", (0, faq_validation_1.FaqValidation)(), validation_services_1.validate, faq_controller_1.update);
router.delete("/delete/:id", faq_controller_1.Delete);
// Unity
router.get("/list", faq_controller_1.list);
//# sourceMappingURL=faq.router.js.map