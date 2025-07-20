interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  photo_profile?: string;
}

export const getUserDisplayName = (user: User): string => {
  return `${user.firstname || ''} ${user.lastname || ''}`.trim();
};

export const getProfileImageUrl = (photo_profile?: string): string => {
  if (!photo_profile) return '';
  
  if (photo_profile.startsWith('profiles/')) {
    return `http://127.0.0.1:8000/storage/${photo_profile}`;
  }
  
  return photo_profile;
};
