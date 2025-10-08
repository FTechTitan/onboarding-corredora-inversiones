// Validación de RUT chileno
export const validateRUT = (rut: string): boolean => {
  // Eliminar puntos y guión
  const cleanRUT = rut.replace(/\./g, '').replace(/-/g, '');
  
  if (cleanRUT.length < 2) return false;
  
  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1).toUpperCase();
  
  // Calcular dígito verificador
  let sum = 0;
  let multiplier = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i)) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const expectedDV = 11 - (sum % 11);
  let calculatedDV: string;
  
  if (expectedDV === 11) calculatedDV = '0';
  else if (expectedDV === 10) calculatedDV = 'K';
  else calculatedDV = expectedDV.toString();
  
  return dv === calculatedDV;
};

// Formatear RUT con puntos y guión
export const formatRUT = (rut: string): string => {
  const cleanRUT = rut.replace(/\./g, '').replace(/-/g, '');
  
  if (cleanRUT.length < 2) return rut;
  
  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1);
  
  // Agregar puntos cada 3 dígitos de derecha a izquierda
  let formattedBody = '';
  for (let i = body.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % 3 === 0) formattedBody = '.' + formattedBody;
    formattedBody = body[i] + formattedBody;
  }
  
  return `${formattedBody}-${dv}`;
};

// Validar email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar teléfono chileno
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\s/g, '').replace(/\+/g, '');
  // Acepta formato +56912345678 o 912345678
  return /^(56)?9\d{8}$/.test(cleanPhone);
};
