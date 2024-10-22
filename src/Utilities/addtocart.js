const getLocalStorage = () => {
  const getCartData = localStorage.getItem("cartData");
  if (getCartData) {
    return JSON.parse(getCartData);
  } else {
    return [];
  }
};

const setLocalStorage = (id) => {
  const getCartData = getLocalStorage();
  if (!getCartData.includes(id)) {
    const addCart = [...getCartData, id];
    localStorage.setItem("cartData", JSON.stringify(addCart));
  }
};
const removeLocalStorage = (id) => {
  const getCartData = getLocalStorage();
  const updatedCart = getCartData.filter((cartId) => cartId !== id);
  localStorage.setItem("cartData", JSON.stringify(updatedCart));
};
const getCourseDataLocalStorage = () => {
    const getCourseData = localStorage.getItem("courseData");
    return getCourseData ? JSON.parse(getCourseData) : [];
  };
  
  const setCourseDataLocalStorage = (data) => {
    const getCourseData = getCourseDataLocalStorage();
    const emailExists = getCourseData.find(course => course.email === data?.email);
    const formNoExists = getCourseData.find(course => course.formNo === data?.formNo);
    if(!emailExists || !formNoExists){
        const newData = [...getCourseData, data];
        localStorage.setItem("courseData", JSON.stringify(newData));
      }
    }
  
  export { setLocalStorage, getLocalStorage, removeLocalStorage, setCourseDataLocalStorage, getCourseDataLocalStorage };
