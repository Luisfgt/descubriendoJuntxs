'use client'
import { useState } from 'react'
import style from './slider.module.css'

const Slider = () => {


    const [active, setActive] = useState(false)

    const handleChange = () => {
        return active ? setActive(false) : setActive(true)
    }

    const styleType = () => {
        const styleActive = {
            transform: 'translateX(-2rem)',
            background: '#a9aaaf'
        }
        const normalStyle = {
            transform: 'translateX(0)'
        }
        if (active) return normalStyle
        return styleActive
    }

    const styleFinal = styleType()

    return (
        <>
            <div className={style.containerSlide}>
                <div className={style.circleContainer} style={styleFinal}>
                    <div onClick={handleChange} className={style.circle}>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Slider