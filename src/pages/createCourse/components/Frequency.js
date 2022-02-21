import React from 'react'
import CustomSelect from '../../../components/inputs/CustomSelect'

const Frequency = ({handleFrequency, selectedFrequency}) => {
  const handleFrequencyChange = event => {
    const {value} = event.target;
    handleFrequency(value);
  };

  const data = [
    { value: 'every_day', text: 'Every day' },
    { value: 'specific_days', text: 'Specific days' },
    { value: 'days_interval', text: 'Days interval' }
  ]

  return <CustomSelect data={data} className="form__row" label_className='form__label' label='Frequency' onChange={handleFrequencyChange} defaultName="Choose frequency" name='select' />
};

export default Frequency;
