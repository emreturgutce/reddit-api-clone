import { body } from 'express-validator';
import { validateRequest } from './validate-request';

export const validatePost = [
  body('title').notEmpty().withMessage('Title field must be provided'),
  body('body').notEmpty().withMessage('body field must be provided'),
  validateRequest,
];
