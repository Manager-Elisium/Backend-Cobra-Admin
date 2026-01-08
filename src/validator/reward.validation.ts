import { body } from 'express-validator';

export const RewardValidation = () => {
    return ([
        body('VALUE').exists().withMessage("Value name is required").isNumeric().withMessage('must be integer value'),
        body('TYPE').exists().withMessage("Reward type is required").isString().withMessage('must be string value'),
        body('DAY').exists().withMessage("Day is required").isNumeric().withMessage('must be string value'),
    ])
}