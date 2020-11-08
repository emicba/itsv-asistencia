import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (...args) => {
  return format(...args, 'MMMM dd, yyyy HH:mm', { locale: es });
};
