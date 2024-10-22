
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getLocalStorage, removeLocalStorage } from "../../Utilities/addtocart";

const Cart = () => {
    const [cartId, setCartId] = useState(getLocalStorage() || []);
    const [coursesData, setCourseData] = useState({});
    const [quantity, setQuantity] = useState({}); 

    const incrementQuantity = (courseId) => {
        setQuantity(prev => ({
            ...prev,
            [courseId]: (prev[courseId] || 1) + 1 
        }));
    };

    const decrementQuantity = (courseId) => {
        setQuantity(prev => {
            const currentQuantity = prev[courseId] || 1; 
            if (currentQuantity > 1) { 
                return {
                    ...prev,
                    [courseId]: currentQuantity - 1 
                };
            }
            return prev; 
        });
    };

    useEffect(() => {
        async function getCourse() {
            const response = await fetch('https://itder.com/api/get-course-list');
            const data = await response.json();
            setCourseData(data);
        }
        getCourse();
    }, []);

    const cartData = coursesData?.courseData?.filter(course => cartId.includes(course.id));
    const totalPrice = (cartData || []).reduce((sum, course) => {
        const qty = quantity[course.id] || 1;
        return sum + (course.discount_price * qty);
    }, 0);
    
    const removeItemFromCart = (courseId) => {
        removeLocalStorage(courseId);
        setCartId(cartId.filter(id => id !== courseId));
    };

    return (
        <div className="m-mt_16px">
            <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
                <h2 className='text-5xl font-bold'>Cart</h2>
            </div>
            <div className="pt-p_16px">
                <div className="lg:flex items-start gap-3">
                    <div className="w-full lg:w-[58%] bg-white border-2">
                        {cartData?.map(course => (
                            <div key={course?.id} className="grid p-4 grid-cols-3 items-start gap-4">
                                <div className="col-span-2 flex items-start gap-4">
                                    <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 bg-gray-100 p-2 rounded-md">
                                        <img src={course?.photo} className="w-full h-full object-contain" alt={course?.course_name} />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-base font-bold text-gray-800">{course?.course_name}</h3>
                                        <button onClick={()=>removeItemFromCart(course?.id)} type="button" className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                                                <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                                                <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                                            </svg>
                                            REMOVE
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-auto flex items-center gap-4">
                                    <h4 className="text-lg font-bold text-gray-800"> ${parseFloat((quantity[course.id] || 1) * (course?.discount_price || 0))}</h4>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => decrementQuantity(course?.id)} type="button" className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 24 24">
                                                <path d="M19 13H5v-2h14v2z" />
                                            </svg>
                                        </button>
                                        <span className="font-bold">{quantity[course.id] || 1}</span> 
                                        <button type="button" onClick={() => incrementQuantity(course?.id)} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 24 24">
                                                <path d="M19 13H5v-2h14v2z" />
                                                <path d="M12 5h-2v6H5v2h5v6h2v-6h5v-2h-5z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:w-[41%] bg-white border-2 ">
                        <div className="px-[30px]">
                            <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                                Cart Summary
                            </h2>
                            <div className="py-3 flex justify-between border-b border-gray-300">
                                <p className="text-black font-bold">Total Price</p>
                                <p className="text-black font-bold">
                                   {totalPrice}
                                </p>
                            </div>
                            <Link
                                to={`/checkout`}
                                state={"bdt"}
                                className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
                            >
                                PROCEED TO CHECKOUT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
