import React, { useEffect, useState, useRef } from 'react'

const CustomSelect = ({
    defaultValue = '',
    className,
    name,
    id = Date.now(),
    register = function() {},
    onChange,
    required = false,
    defaultName = 'Select',
    data = [],
    label = 'Choose',
    label_className = 'form__label',
    setValue,
}) => {
    const [ref, setRef] = useState({})
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(prev => !prev)
    const handleSelect = e => {
        setOpen(false)
        ref.value = e.target.id
        if(setValue) setValue(name, e.target.id, { shouldDirty: true })
        if(onChange) {
            const event = {
                target: {
                    value: e.target.id
                }
            }
            onChange(event)
        }
    }

    useEffect(() => setRef(document.getElementById(id)), [])

    return (
        <div className={`${className} custom-select`}>
            <label className={label_className} htmlFor={id}>{label}</label>
            <div className={`select-selected ${open ? "select-arrow-active" : ''}`} onClick={handleOpen}>{data.find(item => item.value === ref?.value)?.text || defaultName}</div>
            <select id={id} name={name} onClick={handleOpen} defaultValue={defaultValue} className="form__select" {...register(name, {required: required})}>
                <option value='' disabled>{defaultName}</option>
                {data.map(({value, text}) => <option key={value} value={value}>{text}</option>)}
            </select>
            <div className={`select-items ${open ? '' : 'select-hide'}`}>
               {data.map(({value, text}) => <div key={value} id={value} onClick={handleSelect}>{text}</div>)} 
            </div>
        </div>
    )
}

export default CustomSelect