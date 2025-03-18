import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, getUser, login, updateProfile, uploadImage } from './handlers'
import { handleInputErrors } from './middleware/validation'
import { authenticate } from './middleware/auth'

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
    handleInputErrors,
    createAccount
)

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('El email no es valido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    login
)

router.get('/user', authenticate, getUser)
router.patch('/user', 
    body('handle')
        .notEmpty()
        .withMessage('El nombre de usuario no puede estar vacio'), 
    body('description')
        .notEmpty()
        .withMessage('La descripción no puede estar vacia'),
        handleInputErrors,
        authenticate, 
        updateProfile
)

router.post('/user/image', authenticate, uploadImage)

export default router