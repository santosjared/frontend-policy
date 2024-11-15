import { Autocomplete, Avatar, Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ChangeEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

const gender = ['Masculino', 'Femenino']

interface Props {
    toggle: () => void;
}
const AddUser = ({toggle}:Props)=>{

    const [self, setSelf] = useState('/images/avatars/2.png')
    const [profile, setProfile] = useState<File | null>(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm({

      })

      
  const handleProfileOnchage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files?.[0] || null
      setProfile(file)
      if (file?.type.startsWith('image/')) {
        const imgURL = URL.createObjectURL(file);
        setSelf(imgURL);
        setErrorMessage('')
      } else {
        setErrorMessage('Por favor, selecciona un archivo de imagen válido.')
        setSelf('/images/avatars/2.png')
      }
    }
  }
  const handleOnclickCancel = () =>{
    toggle()
  }
      const onSubmit =async (data:any)=>{
        const respose = await axios.post('http://localhost:3001/users',data, {headers: {
            'Content-Type': 'application/json'
          }})
          console.log(respose)
        toggle()
      }
    return (<Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset style={{ border: '1.5px solid #E0E0E0', borderRadius: 10, paddingTop: 20 }}>
            <legend style={{ textAlign: 'center' }}><Typography variant='subtitle2'>Agregar Nuevo Usuario</Typography></legend>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <Avatar
                    alt='user'
                    src=''
                    sx={{ width: 100, height: 100, backgroundColor: '#E0E0E0', border: 'solid 1px #E0E0E0' }} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='profile'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <>
                      <label htmlFor='upload-image' style={{ cursor: 'pointer' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: 'solid 1px #E0E0E0',
                            borderRadius: 1,
                            justifyContent: 'center',
                            padding: 2,
                            mb: 6
                          }}
                        >
                          <CloudUploadIcon />
                          <Typography variant="subtitle2">Seleccionar imagen</Typography>
                          {/* {errors.image && (
                            <FormHelperText sx={{ color: 'error.main' }}>
                            </FormHelperText>
                          )} */}
                        </Box>
                      </label>
                      <input
                        id="upload-image"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(event) => {
                          handleProfileOnchage(event)
                          field.onChange(event.target.files)
                        }}
                        accept='image/*'
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='name'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Nombres"
                        placeholder="Juan Carlos"
                        error={Boolean(errors.name)}
                        autoComplete="off"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='lastName'
                    control={control}
                    render={({ field }) => (<TextField
                      {...field}
                      label='Apellidos'
                      placeholder='Benitez Lopez'
                      error={Boolean(errors.lastName)}
                    />)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 6 }} error={Boolean(errors.gender)}>
                  <InputLabel id="demo-simple-select-label">Género</InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        label="Género"
                      >
                        {gender.map((value) => (
                          <MenuItem value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='ci'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='CI'
                        placeholder='23454788'
                        error={Boolean(errors.ci)}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='phone'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Celular'
                        placeholder='+59172381722'
                        error={Boolean(errors.phone)}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='address'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Dirección'
                        placeholder='Av. Las banderas'
                        error={Boolean(errors.address)}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='contry'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Pais'
                        placeholder='Bolivia'
                        error={Boolean(errors.address)}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Correo electrónico'
                        placeholder='example@gmail.com'
                        error={Boolean(errors.email)}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <OutlinedInput
                        {...field}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        error={Boolean(errors.password)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((prevShow) => !prevShow)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Contraseña"
                      />
                    )}
                  />
                  {/* {errors.password && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                    </FormHelperText>
                  )} */}
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' color='secondary' onClick={handleOnclickCancel} startIcon={<CancelIcon />}>
                Cancelar
              </Button>
              <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} startIcon={<SaveIcon />}>
                Guardar
              </Button>
            </Box>
          </fieldset>
        </form>
      </Box>)
}
export default AddUser