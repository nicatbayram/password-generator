import * as Yup from 'yup';
import { PASSWORD_CONFIG } from '../constants/passwordConfig';

export const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(PASSWORD_CONFIG.MIN_LENGTH, `Should be min of ${PASSWORD_CONFIG.MIN_LENGTH} characters`)
    .max(PASSWORD_CONFIG.MAX_LENGTH, `Should be max of ${PASSWORD_CONFIG.MAX_LENGTH} characters`)
    .required('Length is required'),
});