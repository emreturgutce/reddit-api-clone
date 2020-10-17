import { body } from 'express-validator';
import { validateRequest } from './validate-request';

export const validateCreateNewSubreddit = [
  body('name').notEmpty().withMessage('Name field must be provided'),
  body('description')
    .notEmpty()
    .withMessage('Description field must be provided'),
  validateRequest,
];
