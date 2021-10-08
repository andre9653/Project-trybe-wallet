import React from 'react';
import PropTypes from 'prop-types';

export default class SelectForm extends React.Component {
  render() {
    const { labelText, id, options, value, name, handleChange } = this.props;
    return (
      <label htmlFor={ id }>
        {labelText}
        <select
          id={ id }
          value={ value }
          name={ name }
          onChange={ handleChange }
        >
          {options.map((option, index) => <option key={ index }>{option}</option>)}
        </select>
      </label>
    );
  }
}

SelectForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
