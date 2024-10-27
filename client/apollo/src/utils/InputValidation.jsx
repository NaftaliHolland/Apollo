const validateEmail = (email) => {
  return !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? 'Please enter a valid email' : '';
}

const validateInstitutionName = (name) => {
  return name.length < 2? 'Institution name must be 2 or more characters': ''
}

const validateName = (name) => {
  return !/^[a-zA-Z]{2,}$/.test(name) ? 'Name must be 2 or more characters and should not contain numbers or any special characters': ''
}

const validatePostalCode = (postalCode) => {
  return !/^\d+$/.test(postalCode) ? 'Please enter a valid postal code' : '';
}

const validatePhoneNumber = (phoneNumber) => {
  return !/^0\d{9}$/.test(phoneNumber) ? 'Phone number must be 10 digits starting with \'0\'' : '';
}

const validateYear = (year) => {
  const currentYear = new Date().getFullYear()
  return (!/^(19|20)\d{2}$/.test(year) || year > currentYear)? 'Enter valid year' : '';
}

const validateUrl = (url) => {
  return !/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url) ? 'Please enter a vlid url': '';
}

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/
  return !passwordRegex.test(password) ? 'Password must be at least 8 characters long and contain both letters and numbers.': ''; 
}

const validateRepeatPassword = (repeatPassword, password) => {
  return repeatPassword !== password ? 'Passwords have to match': '';
}

const validateType = (type) => {
  return ''
}

export const validateField = (name, value, password) => {
  switch (name){
    case 'institutionName':
      return validateInstitutionName(value);

     case 'postalCode':
      return validatePostalCode(value);

     case 'phone':
     case 'adminPhone':
      return validatePhoneNumber(value);

    case 'email':
    case 'adminEmail':
      return validateEmail(value);

    case 'year':
      return validateYear(value);
    
    case 'website':
      return validateUrl(value);

    case 'name':
    case 'firstName':
    case 'lastName':
      return validateName(value);

    case 'password':
      return validatePassword(value);

    case 'repeatPassword':
      return validateRepeatPassword(value, password);

    case 'type':
      return validateType(value);
  };
}
