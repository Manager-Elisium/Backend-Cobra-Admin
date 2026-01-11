"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardValidation = void 0;
const express_validator_1 = require("express-validator");
const RewardValidation = () => {
    return ([
        (0, express_validator_1.body)('VALUE').exists().withMessage("Value name is required").isNumeric().withMessage('must be integer value'),
        (0, express_validator_1.body)('TYPE').exists().withMessage("Reward type is required").isString().withMessage('must be string value'),
        (0, express_validator_1.body)('DAY').exists().withMessage("Day is required").isNumeric().withMessage('must be string value'),
    ]);
};
exports.RewardValidation = RewardValidation;
//# sourceMappingURL=reward.validation.js.map