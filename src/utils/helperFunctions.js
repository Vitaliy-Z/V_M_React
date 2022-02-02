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
