import { BsPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { show } from './movieSearchSlice';
import { out } from '../pages/userSlice';
const SideBar = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    function logout() {
        dispatch(out())
        navigate("../", { replace: true });
    }
    function display() {
        dispatch(show())
    }
    return (
        <div className="fixed  left-0 h-1/2  w-16 flex flex-col place-self-center mt-40
        place-content-center  bg-gray-900 shadow-lg">
            <SideBarIcon icon={<BsPlus size="32" />} text='Add Movie' dp={display} />
            <SideBarIcon icon={<HiOutlineLogout size="20" />} text='Log Out ' dp={logout} />

        </div>
    );
};

function SideBarIcon({ icon, text = 'tooltip 💡', dp }) {
    return (
        <div onClick={() => dp()} className="sidebar-icon group">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    );
}



export default SideBar;