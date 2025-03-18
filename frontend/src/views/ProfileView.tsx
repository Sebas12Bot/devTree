import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import ErrorMessage from '../components/ErrorMessage';
import { ProfileForm, User } from '../types';
import { updateProfile } from '../api/DevTreeAPI';
import { toast } from 'sonner';

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(['user'])!;

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })

  const handleUserProfileForm = async (formData: ProfileForm) => {
    await updateProfileMutation.mutateAsync(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-10 rounded-lg shadow-2xl space-y-5 w-full max-w-lg transition-transform duration-300 hover:scale-105"
        onSubmit={handleSubmit(handleUserProfileForm)}
      >
        <legend className="text-3xl font-bold text-gray-800 text-center">Editar Información</legend>

        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="handle" className="font-medium text-gray-700">Nombre de usuario:</label>
          <input
            type="text"
            className="border bg-slate-100 rounded-lg p-3 transition-all duration-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            placeholder="Nombre de Usuario"
            {...register('handle', {
              required: 'El nombre de Usuario es obligatorio'
            })}
          />
          {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="description" className="font-medium text-gray-700">Descripción:</label>
          <textarea
            className="border bg-slate-100 rounded-lg p-3 transition-all duration-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            placeholder="Tu Descripción"
            {...register('description', {
              required: 'La descripción es obligatoria'
            })}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="image" className="font-medium text-gray-700">Imagen:</label>
          <input
            id="image"
            type="file"
            name="image"
            className="border bg-slate-100 rounded-lg p-2 cursor-pointer file:bg-cyan-400 file:text-white file:border-none file:p-2 file:rounded-lg file:cursor-pointer hover:file:bg-cyan-500 transition-all"
            accept="image/*"
            onChange={() => {}}
          />
        </div>

        <input
          type="submit"
          className="bg-cyan-500 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer transition-transform duration-300 hover:bg-cyan-600 hover:scale-105 active:scale-95"
          value="Guardar Cambios"
        />
      </form>
    </div>
  );
}
