export const getAuthErrorMessage = (error: unknown): string => {
  let errorMessage = 'Une erreur inattendue s\'est produite.';
  
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { status: number } };
    if (axiosError.response?.status === 401) {
      errorMessage = 'Email ou mot de passe incorrect.';
    } else if (axiosError.response?.status === 422) {
      errorMessage = 'Veuillez vérifier vos informations de connexion.';
    } else if (axiosError.response?.status && axiosError.response.status >= 500) {
      errorMessage = 'Erreur du serveur. Veuillez réessayer plus tard.';
    } else if (!axiosError.response) {
      errorMessage = 'Problème de connexion réseau. Vérifiez votre connexion internet.';
    }
  }
  
  return errorMessage;
};

export const getSignUpErrorMessage = (error: unknown): string => {
  let errorMessage = 'Une erreur inattendue s\'est produite.';
  const errorDetails: string[] = [];
  
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { status?: number; data?: { errors?: Record<string, string[]> } } };
    
    if (axiosError.response?.status === 422) {
      const errors = axiosError.response.data?.errors || {};
      if (errors.email) {
        errorDetails.push('Cette adresse email est déjà utilisée.');
      }
      if (errors.password) {
        errorDetails.push('Le mot de passe ne respecte pas les critères requis.');
      }
      if (errors.firstname || errors.lastname) {
        errorDetails.push('Veuillez vérifier vos nom et prénom.');
      }
      
      errorMessage = errorDetails.length > 0 
        ? errorDetails.join(' ') 
        : 'Veuillez vérifier vos informations.';
    } else if (axiosError.response?.status && axiosError.response.status >= 500) {
      errorMessage = 'Erreur du serveur. Veuillez réessayer plus tard.';
    } else if (!axiosError.response) {
      errorMessage = 'Problème de connexion réseau. Vérifiez votre connexion internet.';
    }
  }
  
  return errorMessage;
};
