'use client'
import { useEffect, useRef, useState } from "react"


interface optionsType {
    name: string,
    value: number
}

interface propsRecived {
    options: optionsType[]
    onChange: (value: number) => void
    label: string
    styles: any
}

const SelectComponent: React.FC<propsRecived> = ({ options, onChange, label, styles }) => {

    const [openSelect, setOpenSelect] = useState(false)
    const [selected, setSelected] = useState('')
    console.log(options);
    
    const style = () => {
        const styleSelect = {
           color: '#B8BACE'
        }
        const styleNoSelect = {
           color: '#24275A'
        }
        return selected.length === 0 ? styleSelect : styleNoSelect 
    }

    const selectRef: any = useRef(null)

    const handleClickOutside = (event: any) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setOpenSelect(false)
        }
        console.log('hola');
    }

    const styleSelect = style()

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div ref={selectRef} className={styles.labelAndImput}>
            <label className={styles.labelDesign}> {label} </label>
            <div>
                <div  onClick={() => openSelect ? setOpenSelect(false) : setOpenSelect(true)} className={styles.input} style={styleSelect}> {selected.length !== 0 ? selected : 'Seleccionar...'} </div>
                {openSelect &&
                    <div className={styles.selectOptions}>
                        {options.map((option: optionsType) => {
                            return (
                                <>
                                    <div
                                        className={styles.options}
                                        onClick={() => {
                                            onChange(option.value)
                                            setSelected(option.name)
                                            setOpenSelect(false)
                                            }}>
                                        {option.name}
                                    </div>
                                </>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}


export default SelectComponent
