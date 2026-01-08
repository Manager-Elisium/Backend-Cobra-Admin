import { check } from 'express-validator';

export const FaqValidation = () => {
    return ([
        check('QUESTION').exists().withMessage("Question is required").isLength({ min: 5}).withMessage('must be at least 5 chars long').isString().withMessage('must be string value'),
        check('ANSWER').exists().withMessage("Answer is required").isLength({ min: 5 }).withMessage('must be at least 5 chars long').isString().withMessage('must be string value'),
    ])
}