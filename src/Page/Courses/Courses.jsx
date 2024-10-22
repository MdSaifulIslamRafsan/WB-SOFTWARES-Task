import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../../Utilities/addtocart";
import Swal from "sweetalert2";


const Courses = () => {
    
    const [coursesData, setCourseData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const currentCourses = coursesData?.courseData?.slice(indexOfFirst, indexOfLast) || [];
    const handleAddToCart =(id)=>{
        const currentCart = getLocalStorage() || [];
        if (currentCart.includes(id)) {
            Swal.fire({
                icon: 'warning',
                title: 'Item already in cart',
                text: 'This item is already in your cart!',
                confirmButtonText: 'OK'
            });
        } else {
            setLocalStorage(id);
            Swal.fire({
                icon: 'success',
                title: 'Added to cart',
                text: 'Item successfully added to your cart!',
                confirmButtonText: 'OK'
            });
            setTimeout(function(){
                window.location.reload(1);
             }, 2000);
        }    
        
    }
    
    useEffect(()=>{
      async function getCourse(){
        const response = await fetch('https://itder.com/api/get-course-list');
        const data = await response.json();
        setCourseData(data);
       }
       getCourse()
    },[]);
    const totalPages = Math.ceil(coursesData?.courseData?.length / perPage);
    return (
        <div className="m-mt_16px overflow-auto">
          

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {
               currentCourses?.map((course)=>   <div key={course?.id} className=" bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                    <img className="" src='https://itderbd.nextwebservice.com/storage/uploads/course/7674951728743412.jpg' alt="" />
                    <div className="absolute items-center -top-2 left-0 w-full p-2 flex justify-between">
                        <h3 className="text-white text-xs bg-gray-800 p-2 rounded-md">{course.course_name}</h3>
                        <span style={{
                    backgroundImage: "url('https://www.arogga.com/_next/static/media/pdiscount.93e788ec.svg')",
                    
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    width: "54px",
                    height: "44px",
                  }} className="text-xs text-center p-1 text-white font-bold ml-2">{ (((parseFloat(course?.regular_price) - parseFloat(course?.discount_price)) / parseFloat(course?.regular_price)) * 100).toFixed(2)}% <br /> OFF</span>
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-gray-800 text-lg font-semibold mb-2">Course name from Api</h2>
                    <div className="flex items-center justify-between mb-4">

                        <span className="flex text-blue-500 text-md">★★★★★</span>
                        <span className="ml-2 text-gray-600 text-md font-bold">{course?.trainer_data?.name}</span>
                    </div>
                    <hr />
                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            <span className="line-through text-gray-400 text-sm">Tk {course?.regular_price}</span>
                            <span className="text-black text-lg font-bold ml-2">Tk {course?.discount_price}</span>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button onClick={()=> handleAddToCart(course?.id)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md">Add To Cart</button>

                    </div>
                </div>
            </div>)
            }


                  

            </div>
            <div className="flex items-center justify-center mt-8">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-white disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="mx-4 text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            
        </div>
    );
};

export default Courses;