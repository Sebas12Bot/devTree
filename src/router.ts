import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount } from './handlers'

const router = Router()

router.post('/auth/register', 
    body('handle')
        .notEmpty()
        .withMessage('El nombre de usuario no puede estar vacio'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede estar vacio'),
    body('lastName')
        .notEmpty()
        .withMessage('El apellido no puede estar vacio'),
    body('email')
        .isEmail()
        .withMessage('El email no es valido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    createAccount)

export default router