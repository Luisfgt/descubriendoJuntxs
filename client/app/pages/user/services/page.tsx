import style from './services.module.css'
import ServicesProfile from "@/components/ServicesProfile/ServicesProfile"

const UserServicesPage = () => {
    return (
        <div className={style.gridPadre} style={{ color: '#24275A' }}>
            <ServicesProfile/>
        </div>
    )
}

export default UserServicesPage