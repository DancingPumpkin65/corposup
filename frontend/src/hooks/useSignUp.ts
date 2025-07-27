import authService from '@/services/authService';
import { getSignUpErrorMessage } from '@/utils/authErrors';
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";
import {
  setSignUpFormData,
  setSignUpLoading,
  setSignUpAlert,
  setSignUpTermsAccepted,
} from "@/store/signUpSlice";

export const useSignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.signUp.formData);
  const loading = useSelector((state: RootState) => state.signUp.loading);
  const alert = useSelector((state: RootState) => state.signUp.alert);
  const termsAccepted = useSelector((state: RootState) => state.signUp.termsAccepted);

  const showAlert = (type: 'success' | 'error', title: string, message: string) => {
    dispatch(setSignUpAlert({ show: true, type, title, message }));
    if (type === 'success') {
      setTimeout(() => {
        dispatch(setSignUpAlert({ ...alert, show: false }));
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSignUpFormData({ ...formData, [e.target.name]: e.target.value }));
    if (alert.show) {
      dispatch(setSignUpAlert({ ...alert, show: false }));
    }
  };

  const handleRoleChange = (value: string) => {
    dispatch(setSignUpFormData({ ...formData, role: value as 'buyer' | 'seller' }));
    if (alert.show) {
      dispatch(setSignUpAlert({ ...alert, show: false }));
    }
  };

  const validateForm = (): boolean => {
    if (!termsAccepted) {
      showAlert('error', 'Erreur de validation', 'Vous devez accepter les termes et conditions.');
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      showAlert('error', 'Erreur de validation', 'Les mots de passe ne correspondent pas.');
      return false;
    }
    if (formData.password.length < 8) {
      showAlert('error', 'Mot de passe trop court', 'Le mot de passe doit contenir au moins 8 caractères.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setSignUpLoading(true));
    dispatch(setSignUpAlert({ ...alert, show: false }));

    if (!validateForm()) {
      dispatch(setSignUpLoading(false));
      return;
    }

    try {
      const response = await authService.register(formData);
      showAlert(
        'success',
        'Compte créé avec succès!',
        `Bienvenue ${response.user.firstname} ${response.user.lastname}! Vous pouvez maintenant vous connecter.`
      );
      dispatch(setSignUpFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'buyer'
      }));
      dispatch(setSignUpTermsAccepted(false));
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    } catch (error: unknown) {
      const errorMessage = getSignUpErrorMessage(error);
      showAlert('error', 'Erreur lors de l\'inscription', errorMessage);
    } finally {
      dispatch(setSignUpLoading(false));
    }
  };

  return {
    formData,
    loading,
    alert,
    termsAccepted,
    setTermsAccepted: (v: boolean) => dispatch(setSignUpTermsAccepted(v)),
    handleChange,
    handleRoleChange,
    handleSubmit
  };
};
