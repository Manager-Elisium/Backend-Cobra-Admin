import { check } from 'express-validator';

export const TermsAndConditionsValidation = () => {
    return ([
        check('TITLE').exists().withMessage("Title is required").isLength({ min: 5 }).withMessage('must be at least 5 chars long').isString().withMessage('must be string value'),
        check('DESCRIPTIONS').exists().withMessage("Descriptions is required").isLength({ min: 7 }).withMessage('must be at least 10 chars long').isString().withMessage('must be string value'),
    ])
}