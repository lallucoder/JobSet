import React, { useState } from "react";
import ProfileImage from "../img/user_profile_image.png";
import DownArrow from "../img/down_arrow.svg"
import EditProfileIcon from "../img/edit_profile_icon.svg"
import LogOutIcon from "../img/logout_icon.svg"
import SettingsIcon from "../img/settings_icon.svg"
import MenuIcon from "../img/menu_icon.svg"
import UserDashboard from "../img/user_dashboard.png"
import AdminDashboard from "../img/admin_dashboard.png"
import Logo from "../img/shirt-svgrepo-com.svg"
import PrivacyPolicyIcon from "../img/privacy_policy.png"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink,Link,  useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { userLogOutAction } from "../redux/actions/userAction";

const NavBar = () => {
    const [isMenu, setIsMenu] = useState(false);
    const navigate = useNavigate();
    const { userInfo} = useSelector((state) => state.signIn);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const handleItemClick = (index) => {
        setSelectedItem(index);
    };

    const dropDownHandle = () => {
        setIsMenu(!isMenu);
    }

    const logOutUser = ()=>{
        dispatch(userLogOutAction());
        setIsLoggedIn(false);
        window.location.reload(true);
        setTimeout(()=>{
            navigate('/');
        },500);
    }

    // Check if user was logged in previously or not
    useEffect(()=>{
        if(userInfo){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false)
        }
    }, [userInfo])
    
    const activeStyles = "text-lightPrimary after:block after:content-[''] after:absolute after:h-[2px] after:bg-lightPrimary after:w-full after:scale-x-100 after:transition after:duration-500"


    return (
            <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-lightCard shadow-md">
                {/* desktop & tablet */}
                <div className="hidden md:flex w-full h-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={Logo} width='30px'  alt="logo" />
                        <Link to="/">
                            <p className="text-lightModeTextColor text-2xl "><span className="font-semibold">Job</span>Set</p>
                        </Link>
                    </div>
                    <div className="flex items-center gap-8">
                        <ul className="flex items-center gap-10">
                        <NavLink
                            className={({isActive})=>(`text-lg relative block text-lightModeTextColor hover:text-lightPrimary cursor-pointer after:scale-x-0 ${isActive? activeStyles:" "}`)}
                            // onClick={() => handleItemClick(0)}
                            to='/'
                            >
                                <span className="relative">
                                    Home
                                    {/* {selectedItem === true && (
                                        <span className="border-b-2 ease-in-out border-lightPrimary animate-border-animation"></span>
                                    )} */}
                                </span>

                            </NavLink>

                            <NavLink
                            className={({isActive})=>(`text-lg relative block text-lightModeTextColor hover:text-lightPrimary cursor-pointer after:scale-x-0 ${isActive? activeStyles:" "}`)}
                                // onClick={() => handleItemClick(1)}
                                to='/resources'
                            >
                                <span className="relative">
                                    Resources
                                    {/* {selectedItem === 1 && (
                                        <span className="border-b-2 ease-in-out border-lightPrimary animate-border-animation"></span>
                                    )} */}
                                </span>
                            </NavLink>
                            <NavLink
                            className={({isActive})=>(`text-lg relative block text-lightModeTextColor hover:text-lightPrimary cursor-pointer after:scale-x-0 ${isActive? activeStyles:" "}`)}

                                // onClick={() => handleItemClick(2)}
                                to='/findjob'
                            >
                                <span className="relative">
                                    Find Job
                                    {/* {selectedItem === 2 && (
                                        <span className="border-b-2 ease-in-out border-lightPrimary animate-border-animation"></span>
                                    )} */}
                                </span>
                            </NavLink>
                            {isLoggedIn ? (
                                <>
                                    <li className="flex gap-3 text-sm text-lightModeTextColor hover:text-lightPrimary cursor-pointer" onClick={dropDownHandle}>
                                        <img src={ProfileImage} className="w-12 min-w-[40px] h-12 min-h-[40px] cursor-pointer rounded-full" alt="profile_picture" />
                                        <div className="flex flex-col justify-center">
                                            <div>vwakesahu</div>
                                            <div className="text-lighttextGray text-sm -mt-1">Ui/Ux Designer</div>
                                        </div>
                                        <img src={DownArrow} alt="drop_down_menu" />
                                    </li>
                                </>
                            ) : (
                                <>
                                <Link to= '/login'>
                                    <li className="text-lg text-lightModeTextColor hover:text-lightPrimary duration-100 transition-all ease-in-out cursor-pointer">
                                        Login
                                    </li>
                                </Link>
                                    <li className="rounded-full border border-lightPrimary py-3 px-9 text-lg text-lightModeTextColor hover:shadow-lg duration-100 transition-all ease-in-out cursor-pointer">
                                        Register Now
                                    </li>
                                
                                </>
                            )}
                        </ul>

                        <div className="relative">
                            {isMenu && (
                                <div
                                    className="w-[200px] bg-lightCard drop-shadow-lg rounded-lg flex flex-col absolute top-8 right-7 py-2"
                                >
                                    <div className="flex px-4 py-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-lightModeTextColor">
                                        <img src={EditProfileIcon} className="pl-1" alt="logout_icon" />
                                        <Link to='/user/info'
                                            className="w-full flex items-center justify-center gap-3"
                                            onClick={() => setIsMenu(false)}
                                        >
                                            Edit Profile
                                        </Link>
                                    </div>

                                    {userInfo && userInfo.role ===1 && <div className="flex px-4 py-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-lightModeTextColor">
                                        <img src={AdminDashboard} className="pl-1" alt="logout_icon" />
                                        <Link to = '/admin/dashboard'
                                            className="w-full flex items-center justify-center gap-3"
                                            onClick={() => setIsMenu(false)}
                                        >
                                            Admin DashBoard
                                        </Link>
                                    </div>}

                                    {userInfo && userInfo.role===0 && <div className="flex px-4 py-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-lightModeTextColor">
                                        <img src={UserDashboard} className="pl-1" alt="logout_icon" />
                                        <p
                                            className="w-full flex items-center justify-center gap-3"
                                            onClick={() => setIsMenu(false)}
                                        ><Link to='/user/dashboard'>
                                            User DashBoard
                                        </Link>
                                            
                                        </p>
                                    </div>}

                                    
                                    <Link to='/policy'>
                                        <div className="flex px-4 py-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-lightModeTextColor">
                                            <img src={PrivacyPolicyIcon} className="pl-1" alt="logout_icon" />
                                            <p
                                                className="w-full flex items-center justify-center gap-3"
                                                onClick={() => setIsMenu(false)}
                                            >
                                                Privacy Policy
                                            </p>
                                        </div>
                                    </Link>
                                    <Link to='/' onClick={()=>{logOutUser()}}> 
                                        <div className="flex px-4 py-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-lightModeTextColor">
                                            <img src={LogOutIcon} className="pl-1" alt="logout_icon" />
                                            
                                            <p
                                                className="w-full flex items-center justify-center gap-3 text-red-600"
                                                onClick={() => setIsMenu(false)}
                                            >
                                                Log out
                                            </p>
                                        </div>
                                    </Link>
                                   
                                </div>
                            )}
                        </div>
                    </div>
                </div>




                {/* mobile */}
                <div className="md:hidden flex items-center justify-between w-full h-full ">

                    <div to={"/"} className="flex items-center w-full justify-center">
                        <img src={Logo} width='25px' className="mx-1"  alt="logo" />
                        <p className="text-lightModeTextColor text-xl "><span className="font-semibold">Job</span>Set</p>
                    </div>

                    <div className="relative">
                        {isLoggedIn? (
                            <img
                                // whileTap={{ scale: 0.6 }}
                                src={ProfileImage}
                                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                                alt="userprofile"
                                onClick={dropDownHandle}
                            />) : (
                            <img
                                // whileTap={{ scale: 0.6 }}
                                src={MenuIcon}
                                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                                alt="menu"
                                onClick={dropDownHandle}
                            />
                        )}

                        {isMenu && (
                            <div
                                // initial={{ opacity: 0, scale: 0.6 }}
                                // animate={{ opacity: 1, scale: 1 }}
                                // exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                            >




                                <ul className="flex flex-col ">
                                    <li
                                        className="text-base text-lightModeTextColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                        onClick={() => setIsMenu(false)}
                                    >
                                        Home
                                    </li>
                                    <li
                                        className="text-base text-lightModeTextColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                        onClick={() => setIsMenu(false)}
                                    >
                                        Resources
                                    </li>
                                    <li
                                        className="text-base text-lightModeTextColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                        onClick={() => setIsMenu(false)}
                                    >
                                        Find Job
                                    </li>


                                    {userInfo && userInfo.role===1&&
                                        <Link to='/admin/dashboard'
                                            className="text-base text-lightModeTextColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                            onClick={() => setIsMenu(false)}
                                        >
                                            Admin Dashboard
                                        </Link>
                                    }

                                    {userInfo && userInfo.role===0 &&
                                    
                                        <li
                                            className="text-base text-lightModeTextColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                            onClick={() => setIsMenu(false)}
                                        ><Link to="/user/dashboard">
                                            Dashboard
                                        </Link>
                                        </li>
                                    
                                    }

                                    {isLoggedIn ? (
                                        <div>
                                            <li
                                                className="text-base text-lightModeTextColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                                onClick={() => setIsMenu(false)}
                                            >
                                                Edit Profile
                                            </li>
                                            <li
                                                className="text-base text-lightModeTextColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                                onClick={() => setIsMenu(false)}
                                            >
                                                Settings
                                            </li>
                                        </div>) : ('')}

                                </ul>


                                <p
                                    className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-lightPrimary gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-lightCard text-base"

                                >
                                    {isLoggedIn ? ('Log out') : ('Login / Sign Up')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </header>
    );
};

export default NavBar;