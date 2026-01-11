"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsAndConditionsValidation = void 0;
const express_validator_1 = require("express-validator");
const TermsAndConditionsValidation = () => {
    return ([
        (0, express_validator_1.check)('TITLE').exists().withMessage("Title is required").isLength({ min: 5 }).withMessage('must be at least 5 chars long').isString().withMessage('must be string value'),
        (0, express_validator_1.check)('DESCRIPTIONS').exists().withMessage("Descriptions is required").isLength({ min: 7 }).withMessage('must be at least 10 chars long').isString().withMessage('must be string value'),
    ]);
};
exports.TermsAndConditionsValidation = TermsAndConditionsValidation;
//# sourceMappingURL=terms_condition.validation.js.map