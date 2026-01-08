import { check } from 'express-validator';

export const GamesValidation = () => {
    return ([
        check('NAME').exists().withMessage("Name is required").isLength({ min: 4 }).withMessage('must be at least 4 chars long').isString().withMessage('must be string value'),
        check('UNIQUE_NAME').exists().withMessage("Unique name is required").isLength({ min: 3 }).withMessage('must be at least 3 chars long').isString().withMessage('must be string value'),
        check('TYPE').exists().withMessage("Game type is required").isString().withMessage('must be string value'),
    ])
}