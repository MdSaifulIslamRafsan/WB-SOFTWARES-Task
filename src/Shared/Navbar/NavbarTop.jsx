import { MdMenu } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useUser from "../../Security/useUser";
import { FaUserCircle } from "react-icons/fa";
import useSmallScreen from "../../Hooks/useSmallScreen";
import { getLocalStorage } from "../../Utilities/addtocart";

const NavbarTop = () => {
  const { open, setOpen, sidebarRef } = useContext(OrderContext);
  const [isSmallScreen] = useSmallScreen();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userData, ,refetch] = useUser();
  const imgUrl = `https://littleaccount.com/uploads/userProfile/`


  const handleLogout = async () => {
    try {
      const res = await axiosSecure('/api/logout')
    if(res.data){
      navigate('/login')
      localStorage.removeItem('token')
      toast.success('Logout Successfully')
      window.location.reload();
      refetch()
    }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

 
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
  if(isSmallScreen){
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }
  }, [open, isSmallScreen]);
  
  
  

  useEffect(() => {
    if(isSmallScreen){
      setOpen(false)
    } else{
      setOpen(true)
    }
    
  }, [isSmallScreen, setOpen])
  const [getCartData, setCartData] = useState([]);

  useEffect(() => {
    const cartData = getLocalStorage() || [];
    setCartData(cartData);
  }, []);

  return (
    <div className="bg-white py-pt_primary text-_white w-full shadow-md border-b-1 ">
      <ul className="flex gap-gap_primary justify-end items-center px-pt_secondary ">
        <div className="flex items-center gap-gap_primary text-text_sm font-semibold  lg:hidden">
          <MdMenu
            onClick={() => setOpen(!open)}
            className="text-text_xxl cursor-pointer text-black"
          />
        </div>
        <div className="hidden lg:block"></div>

          <Link to={'/cart'} className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
          className="cursor-pointer hover:fill-[#007bff] inline" viewBox="0 0 512 512">
          <path
            d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
            data-original="#000000"></path>
        </svg>
        <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">{getCartData?.length || 0}</span>
      </Link>
        <div
          className="flex flex-col items-center justify-center text-text_sm font-semibold relative group"
        >
          <div className="flex items-center gap-8">
          <h1 className="text-blue-500 text-xl font-medium">{userData?.userData.name}</h1>
         {userData?.userData.image ? 
         <img
            className="w-[40px] h-[40px] rounded-full"
            src={`${imgUrl}${userData.userData.image}`}
            alt=""
          /> : 
          <FaUserCircle className="w-[40px] h-[40px] rounded-full text-black" />}
          </div>

          <div className="absolute top-10 right-3 bg-_white shadow-md rounded-sm overflow-hidden pt-2 w-48 z-10 group-hover:scale-100 transition-transform duration-300 transform origin-top-right scale-0">
            {userData && <Link
              to="/profile"
              className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
            >
              Profile
            </Link>}
            {userData ? <Link
            onClick={handleLogout}
              className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
            >
              Logout
            </Link> : 
            <Link
            to='/login'
              className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
            >
              Login
            </Link>}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default NavbarTop;
