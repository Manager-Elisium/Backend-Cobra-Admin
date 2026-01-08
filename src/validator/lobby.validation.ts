import { body } from 'express-validator';

export const LobbyValidation = () => {
    return ([
        
        body('TITLE').exists().withMessage("Title is required").isString().withMessage('must be string value'),
        // body('NUMBER_OF_PLAYER').exists().withMessage("Please select the number of player").isNumeric().withMessage('must be number value'),
        // body('INDIVIDUAL_BID').exists().withMessage("Please select the individual bid").isNumeric().withMessage('must be number value'),
    ])
}