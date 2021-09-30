import React, {useRef} from 'react';
import PropTypes from 'prop-types';

const CodeInput = ({handleChange, pin_code, onKeyDown, type}) => {
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
    <div className="form__row form__row--columns">
      <div className="form__column--4">
        <input
          ref={input_0}
          className="form__input tac"
          type={type}
          maxLength="1"
          name="1"
          inputMode="numeric"
          onChange={handleChangePin}
        />				
      </div>
      <div className="form__column--4">
        <input
          ref={input_1}
          className="form__input tac"
          type={type}
          maxLength="1"
          name="2"
          inputMode="numeric"
          onChange={handleChangePin}
        />				
      </div>
      <div className="form__column--4">
        <input
          ref={input_2}
          className="form__input tac"
          type={type}
          maxLength="1"
          name="3"
          inputMode="numeric"
          onChange={handleChangePin}
        />				
      </div>
      <div className="form__column--4">
        <input
          ref={input_3}
          className="form__input tac"
          type={type}
          maxLength="1"
          name="4"
          inputMode="numeric"
          onChange={handleChangePin}
          onKeyDown={onKeyDown}
        />				
      </div>
    </div>
	);
}

const CodeInputTypes = {
  text: 'text',
  password: 'password',
};

CodeInput.CodeInputTypes = CodeInputTypes;

CodeInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  pin_code: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.keys(CodeInputTypes)).isRequired,
};

CodeInput.defaultProps = {
  type: 'password',
};

export default CodeInput;
