import { useEffect } from 'react';
import { useAuth } from '@/hooks';
import { USER_ROLES } from '@/utils/constants';

const RoleBasedRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      window.location.href = '/';
      return;
    }

    switch (user?.role) {
      case USER_ROLES.ADMIN:
        window.location.href = '/admin';
        break;
      case USER_ROLES.BUYER:
        window.location.href = '/buyer';
        break;
      case USER_ROLES.SELLER:
        window.location.href = '/seller';
        break;
      default:
        window.location.href = '/';
    }
  }, [user, isAuthenticated, loading]);

  return <div>Redirecting...</div>;
};

export default RoleBasedRedirect;
