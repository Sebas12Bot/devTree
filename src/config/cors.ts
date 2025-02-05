import { CorsOptions} from 'cors'

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
        if (origin ==='http://localhost:5173') {
            callback(null, true)
        } else {
            callback(new Error('No fue permitido porCORS'))
        }
    }
}

export default corsConfig