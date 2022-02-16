import React, { useEffect, useState, useRef } from 'react'

const CustomSelect = ({
    defaultValue = '',
    className,
    name,
    id = Date.now(),
    register,
    required = false,
    defaultName = 'Select',
    data = [],
    label = 'Choose',
    setValue
}) => {
    const [ref, setRef] = useState({})
    function triggerChange(element) {
      let changeEvent = new Event('change')
      element.dispatchEvent(changeEvent)
    }
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(prev => !prev)
    const handleSelect = e => {
        setOpen(false)
        ref.value = e.target.id
        setValue(name, e.target.id)
    }

    useEffect(() => setRef(document.getElementById(id)), [])

    return (
        <div className={`${className} custom-select`}>
            <label className="form__label" htmlFor={id}>{label}</label>
            <div className={`select-selected ${open ? "select-arrow-active" : ''}`} onClick={handleOpen}>{data.find(item => item.value === ref?.value)?.text || defaultName}</div>
            <select ref={ref} id={id} name={name} onClick={handleOpen} defaultValue={defaultValue} className="form__select" {...register(name, {required: required})}>
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