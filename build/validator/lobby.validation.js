"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyValidation = void 0;
const express_validator_1 = require("express-validator");
const LobbyValidation = () => {
    return ([
        (0, express_validator_1.body)('TITLE').exists().withMessage("Title is required").isString().withMessage('must be string value'),
        // body('NUMBER_OF_PLAYER').exists().withMessage("Please select the number of player").isNumeric().withMessage('must be number value'),
        // body('INDIVIDUAL_BID').exists().withMessage("Please select the individual bid").isNumeric().withMessage('must be number value'),
    ]);
};
exports.LobbyValidation = LobbyValidation;
//# sourceMappingURL=lobby.validation.js.map