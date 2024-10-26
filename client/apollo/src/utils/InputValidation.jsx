export const validateEmail = (email) => {
  return !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? 'Please enter a valid email' : '';
}

export const validateInstitutionName = (name) => {
  return name.length < 2? 'Institution name must be 2 or more characters': ''
}

export const validateField = (name, value) => {
  switch (name){
    case 'institutionName':
      return validateInstitutionName(value);

    case 'email':
      console.log(`Validating email ${value}`);
  };
}
