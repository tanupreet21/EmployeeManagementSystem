const { body, param, validationResult } = require('express-validator');

// User validations
exports.validateUserSignup = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 4}).withMessage('Username must be atleast 4 characters'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password') 
        .notEmpty().withMessage('Password is required')  
        .isLength({min: 6}).withMessage('Password must be atleast 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const error = new Error('Validation failed');
            error.status = 400;
            error.details = errors.array();
            return next(error); // Pass to global error handler
        }
        next();
    }
];

exports.validateUserLogin = [
    body('email')
        .custom((value, { req }) => {
            if(!value && !req.body.username) {
                throw new Error('Either email or username is required');
            }
        return true;    
        }),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format'),
    body('password') 
        .notEmpty().withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const error = new Error('Validation failed');
            error.status = 400;
            error.details = errors.array();
            return next(error);
        }
        next();
    }  
];

//Employee validations
exports.validateEmployee = [
    body('first_name')
        .notEmpty().withMessage('First name is required')
        .isAlpha().withMessage('First name should contain only letters'),
    body('last_name')
        .notEmpty().withMessage('Last name is required')
        .isAlpha().withMessage('Last name should contain only letters'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('salary')    
        .notEmpty().withMessage('Salary is required')
        .isNumeric().withMessage('Salary must contain numbers'),
    body('date_of_joining')
        .notEmpty().withMessage('Hire date is required')
        .isISO8601().withMessage('Hire date must be valid (YYYY-MM-DD)'),
    body('position')
        .notEmpty().withMessage('Position is required'),
    body('department')
        .notEmpty().withMessage('Department is required'),    

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const error = new Error('Validation failed');
            error.status = 400;
            error.details = errors.array();
            return next(error);
        }
        next();
    }  
];

exports.validateEmployeeId = [
    param('eid')
      .isMongoId().withMessage('Invalid employee ID'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Invalid employee ID');
        error.status = 400;
        error.details = errors.array();
        return next(error);
      }
      next();
    },
];