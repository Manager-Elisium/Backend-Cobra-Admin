"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsAndConditionRouter = void 0;
const express_1 = __importDefault(require("express"));
const terms_condition_controller_1 = require("src/controller/terms_condition.controller");
const terms_condition_validation_1 = require("src/validator/terms_condition.validation");
const validation_services_1 = require("src/services/validation.services");
let router = express_1.default.Router();
exports.TermsAndConditionRouter = router;
// Admin
router.post("/create", terms_condition_controller_1.insert, (0, terms_condition_validation_1.TermsAndConditionsValidation)(), validation_services_1.validate);
router.put("/update/:id", terms_condition_controller_1.update, (0, terms_condition_validation_1.TermsAndConditionsValidation)(), validation_services_1.validate);
router.get("/paginate/list", terms_condition_controller_1.allDataList);
router.delete("/delete/:id", terms_condition_controller_1.Delete);
// Unity
router.get("/list", terms_condition_controller_1.list);
//# sourceMappingURL=terms_conditions.router.js.map