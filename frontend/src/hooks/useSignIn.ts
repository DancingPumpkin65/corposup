import authService from '@/services/authService';
import { getAuthErrorMessage } from '@/utils/authErrors';
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";
import {
  setSignInFormData,
  setSignInLoading,
  setSignInAlert,
  setSignInRememberMe,
} from "@/store/signInSlice";

export const useSignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.signIn.formData);
  const loading = useSelector((state: RootState) => state.signIn.loading);
  const alert = useSelector((state: RootState) => state.signIn.alert);
  const rememberMe = useSelector((state: RootState) => state.signIn.rememberMe);

  const showAlert = (type: 'success' | 'error', title: string, message: string) => {
    dispatch(setSignInAlert({ show: true, type, title, message }));
    if (type === 'success') {
      setTimeout(() => {
        dispatch(setSignInAlert({ ...alert, show: false }));
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSignInFormData({ ...formData, [e.target.name]: e.target.value }));
    if (alert.show) {
      dispatch(setSignInAlert({ ...alert, show: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setSignInLoading(true));
    dispatch(setSignInAlert({ ...alert, show: false }));

    try {
      const response = await authService.login(formData);
      showAlert(
        'success',
        'Connexion réussie!',
        `Bienvenue ${response.user.firstname} ${response.user.lastname}!`
      );
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error);
      showAlert('error', 'Erreur de connexion', errorMessage);
    } finally {
      dispatch(setSignInLoading(false));
    }
  };

  return {
    formData,
    loading,
    alert,
    rememberMe,
    setRememberMe: (v: boolean) => dispatch(setSignInRememberMe(v)),
    handleChange,
    handleSubmit
  };
};
