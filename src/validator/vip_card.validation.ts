import { check } from 'express-validator';

export const VipCardValidation = () => {
    return ([
        check('TITLE').exists().withMessage("Title is required").isLength({ min: 5 }).withMessage('must be at least 5 chars long').isString().withMessage('must be string value'),
        check('VALUE').exists().withMessage("Value is required").isNumeric().withMessage('must be string value'),
        check('DAYS').exists().withMessage("Days is required").isString().withMessage('must be string value'),
        check('BENEFITS').exists().withMessage("Benefits is required").isJSON().withMessage('must be json value'),
    ])
}