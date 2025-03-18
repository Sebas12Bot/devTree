import { CorsOptions } from 'cors';

console.log('CORS - FRONTEND_URL:', process.env.FRONTEND_URL);

const whiteList = [process.env.FRONTEND_URL];

if (process.argv[2] === '--api') {
    whiteList.push(undefined);
}

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {

        if (!origin || whiteList.includes(origin) || whiteList.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('No fue permitido por CORS'));
        }
    },
    credentials: true,
};

export default corsConfig;
