const getLocalStorage = () => {
    const getCartData = localStorage.getItem('cartData');
    if(getCartData) {
        return JSON.parse(getCartData);
    } else {
        return [];
    }
}

const setLocalStorage = (id) => {
    const getCartData = getLocalStorage();
    const addCart = [...getCartData, id]
    localStorage.setItem('cartData', JSON.stringify(addCart));
}

export {setLocalStorage , getLocalStorage}