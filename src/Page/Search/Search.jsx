import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { getCourseDataLocalStorage } from "../../Utilities/addtocart";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);
    const allCoursesData = getCourseDataLocalStorage(); 

    const handleSearch = (e) => {
        e.preventDefault(); 
        const results = allCoursesData.filter(course =>
            course.formNo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(results);
    };
console.log(filteredCourses);

    return (
        <div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center">
            <h1 className="w-[600px] mx-auto">Search here</h1>
            <form onSubmit={handleSearch} className="h-[52px] relative col-span-4 w-[600px] mx-auto">
                <input
                    type="text"
                    name="search"
                    placeholder="Search for courses"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
                />
                <button type="submit" className="text-2xl text-black absolute right-2 top-2">
                    <IoMdSearch />
                </button>
            </form>

            {filteredCourses.map((course)=>   <div  key={course?.id} className="bg-white lg:p-p_30px w-full  ">
                    <p className="text-xl text-center px-5 pt-3 font-bold">Job Title : {course?.jobTitle}</p>
                        <div className="w-full flex flex-col md:flex-row md:items-start   md:mt-4 mt-3  rounded-md p-4  ">
                            <div className="md:text-base text-sm flex-1  font-semibold   md:pr-10">
                                <div className="space-y-1 w-full">
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Form id : </p>
                                        <p className="text-start">
                                        {course?.formNo}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Full Name :  :</p>
                                        <p>{course?.fullName}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Mobile :</p>
                                        <p className="text-start">
                                           {course?.mobile}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Gender :</p>
                                        <p>{course?.gender}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>NID :</p>
                                        <p className="text-start">
                                           {course?.nid}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Present Address :</p>
                                        <p>{course?.presentAddress}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                        <p>Permanent Address :</p>
                                        <p>{course?.permanentAddress || "N/A"}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-2 p-2">
                                    <p>Email :</p>
                                    <p>{course?.email || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:text-base text-sm  flex-1 font-semibold  md:ml-10 mt-m_medium">
                            
                            <div className="space-y-1 w-full">
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>Parent Name :</p>
                                    <p className="text-start">
                                        {course?.parentName}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>Parent Number :</p>
                                    <p>{course?.ParentNumber || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>Guardian Name :</p>
                                    <p className="text-start">
                                       {course?.guardianName}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>Guardian Number :</p>
                                    <p>{course?.guardianNumber}</p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>School :</p>
                                    <p className="text-start">
                                        {course?.school}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>Date Of Birth :</p>
                                    <p>{course?.dateOfBirth}</p>
                                </div>
                                <div className="flex items-center justify-between border-2 p-2">
                                    <p>bloodGroup :</p>
                                    <p>{course?.bloodGroup}</p>
                                </div>
                            </div>
                            </div>
                        </div>

               
                    </div>) 
            }
        </div>
    );
};

export default Search;
