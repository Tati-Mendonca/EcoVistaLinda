export const removeMask = (phone: string): string => {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
};

export const isNumeric = (value: string): string => {
  if (!value) return "";
  
  const numeric = value.replace(/\D/g, "");
  const validNumber = numeric.slice(0, 11);

  if (validNumber.length <= 2) {
    return validNumber.replace(/^(\d{0,2})/, "($1");
  }
  if (validNumber.length <= 6) {
    return validNumber.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
  }
  return validNumber.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
};

export const validPhoneNumber = (phone: string): boolean => {
  const numeric = removeMask(phone)
  return numeric.length === 11;
};

export const isText = (name: string): boolean => {
  const regexText = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return regexText.test(name);
};

export const validateFullName = (name: string): boolean => {
  const fullName = name.trim();
  
  const splitNames = fullName.split(/\s+/);
  
  return splitNames.length >= 2 && splitNames.every(split => split.length >= 2);
};

