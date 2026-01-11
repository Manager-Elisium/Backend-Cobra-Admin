"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesValidation = void 0;
const express_validator_1 = require("express-validator");
const GamesValidation = () => {
    return ([
        (0, express_validator_1.check)('NAME').exists().withMessage("Name is required").isLength({ min: 4 }).withMessage('must be at least 4 chars long').isString().withMessage('must be string value'),
        (0, express_validator_1.check)('UNIQUE_NAME').exists().withMessage("Unique name is required").isLength({ min: 3 }).withMessage('must be at least 3 chars long').isString().withMessage('must be string value'),
        (0, express_validator_1.check)('TYPE').exists().withMessage("Game type is required").isString().withMessage('must be string value'),
    ]);
};
exports.GamesValidation = GamesValidation;
//# sourceMappingURL=games.validation.js.map