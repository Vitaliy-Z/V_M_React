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
