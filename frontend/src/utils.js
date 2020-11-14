import { makeStyles } from '@material-ui/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { read, utils } from 'xlsx';

export const formatDate = (...args) => {
  return format(...args, 'MMMM dd, yyyy HH:mm', { locale: es });
};

export const useCommonStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    padding: '1rem',
  },
}));

export const readExcel = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = e => {
      const bufferArr = e.target.result;
      const wb = read(bufferArr, { type: 'buffer' });
      const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      resolve(data);
    };
    reader.onerror = err => {
      reject(err);
    };
  });
};
