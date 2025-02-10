import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from 'sonner'
import type { RegisterCredencials } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

export default function RegisterView() {

    const initialValues= {
        name: '',
        lastName: '',
        email: '',
        handle: '',
        password: '',
        password_confirmation: ''
    }
    
    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<RegisterCredencials>({ defaultValues: initialValues, mode: "onChange" })

    const password = watch('password')

    const handleRegister = async (formData : RegisterCredencials) => {
      try {
        const { data } = await api.post(`/auth/register`,
        formData);
        toast.success(data)
        reset()
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          toast.error(error.response.data.error)
        }
      }
    };
    

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Crear cuenta</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('name', { 
                required: "El nombre es obligatorio"
            })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

        </div>
        <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="lastname" className="text-2xl text-slate-500">
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Tu apellido"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register('lastName', { 
                required: "El apellido es obligatorio"
            })}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}

        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('email', { 
                required: "La dirección de correo es obligatoria",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Dirección de correo no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Nombre de Usuario
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario (sin espacios)"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('handle', { 
                required: "El nombre de usuario es obligatorio",
            })}
          />
          {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
          
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña de registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password', { 
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              }
          })}
          
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir contraseña"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password_confirmation', { 
              required: "Repetir la contraseña es obligatorio",
              validate: (value) => value === password || "Las contraseñas no coinciden"
          })}          
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}

        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"

        />
      </form>

      <nav className="mt-10">
        <Link className="text-center text-white text-lg block" to="/auth/login">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  );
}
