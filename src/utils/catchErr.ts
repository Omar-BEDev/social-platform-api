export const catchError = (fn: Function): void => {
  try {
    fn();
  } catch (error) {
    console.error("socket error : ", error || "unknow error");
  }
};
