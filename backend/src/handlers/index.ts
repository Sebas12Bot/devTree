import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import slugify from 'slugify'
import formidable from 'formidable'
import User from "../models/User"
import { comparePassword, hashPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'
import { v2 as cloudinary } from 'cloudinary';

export const createAccount = async (req: Request, res: Response) => {
    
    //Manejar errores
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        const error = new Error('El email ya esta registrado')
        res.status(409).json({ error: error.message })
        return
    }

    const handle = slugify(req.body.handle, '')
    const handleExists = await User.findOne({ handle })
    if (handleExists) {
        const error = new Error('El nombre de usuario no esta disponible')
        res.status(409).json({ error: error.message })
        return
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()
    res.status(201).send('Registro Creado Correctamente')
}

export const login = async (req: Request, res: Response) => {
    
    //Manejar errores
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('Usuario no registrado')
        res.status(404).json({ error: error.message })
        return
    }

    const isPasswordCorrect = await comparePassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('La contraseña es incorrecta')
        return res.status(401).json({ error: error.message })
    }

    const token = generateJWT({id: user._id})

    res.send(token)
}

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { description } = req.body
        const handle = slugify(req.body.handle, '')
        const handleExists = await User.findOne({ handle })
        if (handleExists && handleExists.email !== req.user.email) {
            const error = new Error('Usuario no encontrado')
            res.status(404).json({ error: error.message })
            return
        }

        req.user.description = description
        req.user.handle = handle
        await req.user.save()
        res.send('Perfil actualizado correctamente')

    } catch (e) {
        const error = new Error('Hubo un error')
        res.status(500).json({ error: error.message })
        return
    }
}

export const uploadImage = async (req: Request, res: Response) => {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("❌ Error en formidable:", err);
            return res.status(400).json({ error: "Error al procesar el archivo" });
        }

        console.log("✅ Archivos recibidos:", files);

        const file = files.file as formidable.File | formidable.File[] | undefined;
        if (!file) {
            console.error("❌ No se encontró un archivo en la solicitud.");
            return res.status(400).json({ error: "No se encontró un archivo en la solicitud" });
        }

        const uploadedFile = Array.isArray(file) ? file[0] : file;
        console.log("📂 Archivo listo para subir:", uploadedFile.filepath);

        try {
            const result = await cloudinary.uploader.upload(uploadedFile.filepath);
            console.log("✅ Imagen subida a Cloudinary:", result);
            res.json({ url: result.secure_url });
        } catch (uploadError) {
            console.error("❌ Error al subir a Cloudinary:", uploadError);
            res.status(500).json({ error: "Error al subir la imagen" });
        }
    });
};



