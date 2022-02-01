import React, {useRef} from 'react';
import PropTypes from 'prop-types';

const PinInput = ({handleChange, pin_code, onKeyDown, type}) => {
	const input_0 = useRef(null);
	const input_1 = useRef(null);
	const input_2 = useRef(null);
	const input_3 = useRef(null);

	const handleChangePin = event => {
		const index = Number(event.target.name) - 1;
		const value = event.target.value;
		const newPin = pin_code[index] ? pin_code[index].replace(pin_code[index], value) : pin_code + value;
		handleChange(newPin);
		if (value) {
			switch(index) {
				case 0:
					input_1.current.focus();
					break;
				case 1:
					input_2.current.focus();
					break;
				case 2:
					input_3.current.focus();
					break;
				case 3:
					break;
				default:
					break;
			}
		} else {
      switch(index) {
				case 0:
					break;
				case 1:
					input_0.current.focus();
					break;
				case 2:
					input_1.current.focus();
					break;
				case 3:
          input_2.current.focus();
					break;
				default:
					break;
			}
    }
	};
	return (
    <div className="block__content">
      <div className="form__row form__row--pin">
        <input
          ref={input_0}
          type={type}
          className="form__input--pin"
          maxLength="1"
          name="1"
          inputMode="numeric"
          onChange={handleChangePin}
        />			
        <input
          ref={input_1}
          type={type}
          className="form__input--pin"
          maxLength="1"
          name="2"
          inputMode="numeric"
          onChange={handleChangePin}
        />			
        <input
          ref={input_2}
          type={type}
          className="form__input--pin"
          maxLength="1"
          name="3"
          inputMode="numeric"
          onChange={handleChangePin}
        />			
        <input
          ref={input_3}
          type={type}
          className="form__input--pin"
          maxLength="1"
          name="4"
          inputMode="numeric"
          onChange={handleChangePin}
        />			
      </div>
    </div>
	);
}

const PinInputTypes = {
  text: 'text',
  password: 'password',
};

PinInput.PinInputTypes = PinInputTypes;

PinInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  pin_code: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.keys(PinInputTypes)).isRequired,
};

PinInput.defaultProps = {
  type: 'password',
};

export default PinInput;
