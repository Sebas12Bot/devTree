import { Router } from 'express'

const router = Router()

/** Autenticacion y Registros */
router.get('/auth/register', (req, res) => {
    console.log('desde Registro')
})

export default router