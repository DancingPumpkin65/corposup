export const formatUserName = (firstname: string, lastname: string): string => {
  return `${firstname} ${lastname}`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
