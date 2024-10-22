import { useEffect, useState } from "react";


const Courses = () => {
    const [coursesData, setCourseData] = useState({});
    useEffect(()=>{
      async function getCourse(){
        const response = await fetch('https://itder.com/api/get-course-list');
        const data = await response.json();
        setCourseData(data);
       }
       getCourse()
    },[]);
    return (
        <div className="m-mt_16px">
          

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {
                coursesData?.courseData?.map((course)=>   <div key={course?.id} className=" bg-white shadow-lg rounded-lg overflow-hidden">
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
                            <span className="text-black text-lg font-bold ml-2">{course?.discount_price}</span>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md">Add To Cart</button>

                    </div>
                </div>
            </div>)
            }

                  

            </div>
        </div>
    );
};

export default Courses;