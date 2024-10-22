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
    if (!getCartData.includes(id)) {
        const addCart = [...getCartData, id];
        localStorage.setItem('cartData', JSON.stringify(addCart));
    }
}
const removeLocalStorage = (id) => {
    const getCartData = getLocalStorage();
    const updatedCart = getCartData.filter(cartId => cartId !== id);
    localStorage.setItem('cartData', JSON.stringify(updatedCart));
}

export {setLocalStorage , getLocalStorage, removeLocalStorage }