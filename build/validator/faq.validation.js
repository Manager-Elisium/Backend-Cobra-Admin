"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqValidation = void 0;
const express_validator_1 = require("express-validator");
const FaqValidation = () => {
    return ([
        (0, express_validator_1.check)('QUESTION').exists().withMessage("Question is required").isLength({ min: 5 }).withMessage('must be at least 5 chars long').isString().withMessage('must be string value'),
        (0, express_validator_1.check)('ANSWER').exists().withMessage("Answer is required").isLength({ min: 5 }).withMessage('must be at least 5 chars long').isString().withMessage('must be string value'),
    ]);
};
exports.FaqValidation = FaqValidation;
//# sourceMappingURL=faq.validation.js.map