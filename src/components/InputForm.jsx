import React from 'react';
import PropTypes from 'prop-types';

export default class InputForm extends React.Component {
  render() {
    const { name, handleChange, labelText, value } = this.props;
    return (
      <label htmlFor={ name }>
        {labelText}
        <input
          type="text"
          id={ name }
          name={ name }
          value={ value }
          onChange={ handleChange }
        />
      </label>
    );
  }
}

InputForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
