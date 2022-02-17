import { TOKEN_KEY } from "./constant";

export const updateObjToArr = obj => {
  if (!Array.isArray(obj)) {
    const array = Object.keys(obj).map(item => obj[item]);
    return array;
  }
  return obj;
};

export const updateArray = arr =>
  arr.map(item => ({
    ...item,
    value: item._id,
    label: item.name
  }));

export const transformDataToFeild = data => {
  const arr = updateObjToArr(data);
  const updateData = updateArray(arr);
  return updateData;
};

export const transformTime = time => {
  const date = new Date(time);
  const different = Date.now() - time;
  const differentOfYear = new Date().getFullYear() - date.getFullYear();
  if (differentOfYear > 0) {
    return (
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  }
  const differentOfDay = Math.floor(different / 1000 / 60 / 60 / 24);
  if (differentOfDay > 0) {
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long"
    })}`;
  }
  const differentOfMinutes = Math.floor(different / 1000 / 60);
  if (differentOfMinutes > 30) {
    if (date.getMinutes() < 10) {
      return `${date.getHours()}:0${date.getMinutes()}`;
    }
    return `${date.getHours()}:${date.getMinutes()}`;
  }
  if (differentOfMinutes <= 1) {
    return "1 минуту назад";
  }
  if (differentOfMinutes <= 5) {
    return "5 минут назад";
  }
  if (differentOfMinutes <= 10) {
    return "10 минут назад";
  }
  if (differentOfMinutes <= 30) {
    return "30 минут назад";
  }
};

export const changeHandlerInput = (setData, name, value) =>
  setData(prev => {
    if (typeof value === "string" || typeof value === "boolean") {
      return {
        ...prev,
        [name]: value
      };
    }
    if (typeof value === "boolean") {
      return {
        ...prev,
        [name]: value
      };
    }
    if (Array.isArray(value)) {
      return {
        ...prev,
        [name]: value.map(({ value }) => value)
      };
    }
    if (typeof value === "object") {
      return {
        ...prev,
        [name]: value.value
      };
    }
  });

export const setTokensToLocalStorage = ({
  idToken,
  refreshToken,
  expiresIn = 3600
}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY.token, idToken);
  localStorage.setItem(TOKEN_KEY.refreshToken, refreshToken);
  localStorage.setItem(TOKEN_KEY.expires, expiresDate);
};
