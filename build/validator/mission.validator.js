"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionValidation = void 0;
const express_validator_1 = require("express-validator");
const MissionValidation = () => {
    return ([
        (0, express_validator_1.body)('TEXT').exists().withMessage("Text is required").isString().withMessage('must be string value'),
        (0, express_validator_1.body)('TYPE').exists().withMessage("Type is required").isString().withMessage('must be string value'),
        (0, express_validator_1.body)('WIN_COUNT').exists().withMessage("Win count is required").isNumeric().withMessage('must be number value'),
    ]);
};
exports.MissionValidation = MissionValidation;
//# sourceMappingURL=mission.validator.js.map