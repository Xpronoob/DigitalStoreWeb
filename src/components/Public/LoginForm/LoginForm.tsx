import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues, schema } from './loginFormModel';
import InputForm from '@/components/ui/InputForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/states/userStore.states';
import { useQuery } from '@/hooks/useQuery';
import { userModel } from '@/models/user.models';
import { useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '@/states/cartStore.states';

const LoginForm = () => {
  const [customError, setCustomError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const { syncUserCartInAuthentication } = useCartStore();

  const [bodyData, setBodyData] = useState<userModel | undefined>(undefined);

  const { data, loading, error } = useQuery<userModel>(
    '/auth/login',
    'POST',
    bodyData,
    isSubmitted
  );

  useEffect(() => {
    if (data) {
      setUser(data);
      syncUserCartInAuthentication(queryClient);
      navigate('/');
    } else if (error && isSubmitted) {
      setCustomError(error);
    }
  }, [data, error, setUser, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    setBodyData(formData);
    setIsSubmitted(true);
    queryClient.invalidateQueries({ queryKey: ['/cart/getCart'] });

    // AuthService.postLogin(data)
    //   .then((response) => {
    //     setUser(response.user);
    //     navigate('/');
    //   })
    //   .catch((err) => {
    //     setCustomError(err.response.data.message);
    //     console.log(err);
    //   });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm<FormValues>
          fieldKey='email'
          control={control}
          label='Email'
          type='email'
          error={errors.email}
        />
        <InputForm<FormValues>
          fieldKey='password'
          control={control}
          label='Password'
          type='password'
          error={errors.password}
        />
        <button type='submit'> Submit</button>
      </form>
      {/* {data && <p>Cargando...</p>}
      {error && <p>{error.message}</p>}
      {customError && <p>{customError}</p>} */}
      {/* {loading && isSubmitted && <p>Cargando...</p>} */}
      {loading && <p>Cargando...</p>}
      {isSubmitted && customError && <p>{customError}</p>}
    </>
  );
};

export default LoginForm;
