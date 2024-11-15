import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [message,setMessage] = useState();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({

  })
  const onSubmit = async (data:any)=>{
    const respose = await axios.post('http://localhost:3001/auth', data,{headers:{'Content-Type': 'application/json'}})
    if(respose.data.access_token){
      handleSignIn();
    }
  }
  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
        name='email'
        control={control}
        defaultValue='hello@gmail.com'
        render={({field})=>(
          <TextField
          {...field}
          fullWidth
          name="email"
          label="Email address"
          defaultValue="hello@gmail.com"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />
        )}
        />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        olvido su contraseña?
      </Link>
      <Controller
      name='password'
      control={control}
      defaultValue='@demo1234'
      render={({field})=>(
        <TextField
        {...field}
        fullWidth
        name="password"
        label="Password"
        defaultValue="@demo1234"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
      )}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
      >
        Iniciar sesion
      </LoadingButton>
      </form>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Login</Typography>
        <Typography variant="body2" color="text.secondary">
          No tiene cuenta?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Registrarse
          </Link>
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}
