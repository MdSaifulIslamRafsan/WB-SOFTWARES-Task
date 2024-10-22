import { getCourseDataLocalStorage } from "../../Utilities/addtocart";
import TrackOrder from "./TrackOrder";


const OrderDetails = () => {
  const ordersData = getCourseDataLocalStorage();

  const lastIndex = ordersData.length - 1;
  const orderData = ordersData[lastIndex];

  console.log(orderData);
  const {
    ParentNumber,
    bloodGroup,
    dateOfBirth,
    email,
    formNo,
    fullName,
    gender,
    guardianName,
    guardianNumber,
    jobTitle,
    mobile,
    nid,
    parentName,
    permanentAddress,
    presentAddress,
    school,
    totalPrice,
    cartData

  } = orderData;
  
 
    return (
        
            <div className=" m-mt_16px">
                 <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
                <h2 className='text-5xl font-bold'>Order Information</h2>
            </div>
                <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 ">
                    <div className="bg-white lg:p-p_30px w-full  ">
                    <p className="text-xl text-center px-5 pt-3 font-bold">Job Title : {jobTitle}</p>
                        <div className="w-full flex flex-col md:flex-row md:items-start   md:mt-4 mt-3  rounded-md p-4  ">
                            <div className="md:text-base text-sm flex-1  font-semibold   md:pr-10">
                                <div className="space-y-1 w-full">
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Form id : </p>
                                        <p className="text-start">
                                        {formNo}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Full Name :</p>
                                        <p>{fullName}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Mobile :</p>
                                        <p className="text-start">
                                           {mobile}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Gender :</p>
                                        <p>{gender}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>NID :</p>
                                        <p className="text-start">
                                           {nid}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Present Address :</p>
                                        <p>{presentAddress}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Permanent Address :</p>
                                        <p>{permanentAddress || "N/A"}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                    <p>Email :</p>
                                    <p>{email || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:text-base text-sm  flex-1 font-semibold  md:ml-10 mt-m_medium">
                            
                            <div className="space-y-1 w-full">
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>Parent Name :</p>
                                    <p className="text-start">
                                        {parentName}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>Parent Number :</p>
                                    <p>{ParentNumber || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>Guardian Name :</p>
                                    <p className="text-start">
                                       {guardianName}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>Guardian Number :</p>
                                    <p>{guardianNumber}</p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>School :</p>
                                    <p className="text-start">
                                        {school}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>Date Of Birth :</p>
                                    <p>{dateOfBirth}</p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>bloodGroup :</p>
                                    <p>{bloodGroup}</p>
                                </div>
                            </div>
                            </div>
                        </div>

                     <div className="lg:my-8 md:my-6 my-8 px-p_4px">
                        <p className=" md:my-2 font-semibold">Courses:</p>
                        <table className="overflow-x-auto border w-full">
                            <thead className="b w-full">
                                <tr className="text-sm ">
                                    <th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6  ">
                                        Image
                                    </th>
                                    <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 ">
                                        Course Name
                                    </th>
                                    <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 ">
                                      Student   Name
                                    </th>
                                   
                                    <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6  text-center">
                                     Price
                                    </th>
                                    <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6  text-center">
                                    totalPrice
                                    </th>
                                </tr>
                            </thead>
                            {
                                 cartData?.map((course ,index)=>  <tbody key={index}className="md:text-base text-sm font-semibold">
                              
                                 <tr >
                                     <td className=" text-center w-10 h-12 px-2">
                                         <img
                                             className=" w-full h-full object-cover mx-auto"
                                             src={course?.photo}
                                             alt={course?.course_name}
                                         />
                                     </td>
                                     <td className="lg:py-6 md:py-4 py-2 text-center ">
                                       {course?.course_name}
                                     </td>
                                     <td className="lg:py-6 md:py-4 py-2 text-center ">
                                        {fullName}
                                     </td>
                                    
                                     <td className="lg:py-6 md:py-4 py-2 text-center ">
                                         {course?.discount_price}
                                     </td>
                                     <td className="lg:py-6 md:py-4 py-2 text-center ">
                                       {totalPrice}
                                     </td>
                                 </tr>
                             
                         </tbody> )
                            }
                           
                        </table>
                    </div>
                    </div>
                   
                </div>
            </div>
    );
};

export default OrderDetails;
