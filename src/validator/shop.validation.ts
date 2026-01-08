import { check } from 'express-validator';

export const ShopValidation = () => {
    return ([
        check('NAME').exists().withMessage("Name is required").isLength({ min: 4 }).withMessage('must be at least 5 chars long').isString().withMessage('must be string value'),
        check('VALUE').exists().withMessage("Value is required").isNumeric().withMessage('must be number value'),
        check('PRICE').exists().withMessage("Price is required").isNumeric().withMessage('must be number value'),
        check('TYPE').exists().withMessage("Type is required").isString().withMessage('must be string value'),
    ])
}