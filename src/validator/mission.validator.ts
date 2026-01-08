import { body, check } from 'express-validator';

export const MissionValidation = () => {
    return ([
        body('TEXT').exists().withMessage("Text is required").isString().withMessage('must be string value'),
        body('TYPE').exists().withMessage("Type is required").isString().withMessage('must be string value'),
        body('WIN_COUNT').exists().withMessage("Win count is required").isNumeric().withMessage('must be number value'),     
    ])
}