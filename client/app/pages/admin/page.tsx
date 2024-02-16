import ProfilePage from "@/components/UserProfile/ProfilePage/ProfilePage";
import style from './adminProfile.module.css'
import axios from 'axios'
import AdminDashboard from "@/components/AdminDashboard/AdminSideBar/SideBar";
import AdminProfile from "@/components/AdminDashboard/AdminProfile/AdminProfile";



const Admin = () => {

    return (
        <div className={style.gridColumns} style={{ color: '#24275A' }}>
            <AdminProfile
            />
        </div>
    );
}

export default Admin;