import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Usuarios',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Iniciar sesion',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Roles y permisos',
    path: '/roles',
    icon: icon('ic-user'),
  },
  {
    title: 'Registrar Denuncias',
    path: '/denuncias',
    icon: icon('ic-user'),
  },
];
