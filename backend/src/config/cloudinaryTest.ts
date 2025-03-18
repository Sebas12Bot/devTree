import dotenv from 'dotenv';
dotenv.config();  // 📌 Esto debe estar en la primera línea

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
});

console.log("⏳ Verificando variables de entorno...");
console.log("CLOUDINARY_NAME:", process.env.CLOUDINARY_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_SECRET:", process.env.CLOUDINARY_SECRET);

cloudinary.uploader.upload("ruta_de_tu_imagen.jpg", function (error, result) {
    console.log(error, result);
  });
  