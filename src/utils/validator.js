const validatorConfig = {
  email: {
    isRequire: "Заполните поле почты",
    isEmail: "Почта введена некорректно"
  },
  password: {
    isRequire: "Заполните поле пароля",
    isCapital: "Пароль должен содержать заглавную букву",
    isLowercase: "Пароль должен содержать строчную букву",
    isIncludeNumber: "Пароль должен содержать цыфру",
    isValidLength: "Пароль должен быть не менее 8-и символов"
  }
};

const validator = data => {
  const err = {};
  for (const fieldName in data) {
    for (const validateMethod in validatorConfig[fieldName]) {
      switch (validateMethod) {
        case "isRequire":
          if (data[fieldName] === "") {
            err[fieldName] = validatorConfig[fieldName][validateMethod];
          }
          break;
        case "isEmail": {
          const regExp = /^\S+@\S+\.\S+$/g;
          if (!regExp.test(data.email) && !err[fieldName]) {
            err[fieldName] = validatorConfig[fieldName][validateMethod];
          }
          break;
        }
        case "isCapital": {
          const regExp = /[A-Z]/g;
          if (!regExp.test(data.password) && !err[fieldName]) {
            err[fieldName] = validatorConfig[fieldName][validateMethod];
          }
          break;
        }
        case "isLowercase": {
          const regExp = /[a-z]/g;
          if (!regExp.test(data.password) && !err[fieldName]) {
            err[fieldName] = validatorConfig[fieldName][validateMethod];
          }
          break;
        }
        case "isIncludeNumber": {
          const regExp = /\d/g;
          if (!regExp.test(data.password) && !err[fieldName]) {
            err[fieldName] = validatorConfig[fieldName][validateMethod];
          }
          break;
        }
        case "isValidLength": {
          if (data.password.length < 8 && !err[fieldName]) {
            err[fieldName] = validatorConfig[fieldName][validateMethod];
          }
          break;
        }
        default:
          break;
      }
    }
  }
  return err;
};
export default validator;
