import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Select = styled.select`
  background-color: dodgerblue;
  border-color: white;
  border-radius: 5px;
  margin-left: 3px;
  padding: 5px;
  text-align: center;
`;

const Label = styled.label`
  padding: 5px;
`;

export default class SelectForm extends React.Component {
  render() {
    const { labelText, id, options, value, name, handleChange } = this.props;
    return (
      <Label htmlFor={ id }>
        {labelText}
        <Select
          id={ id }
          value={ value }
          name={ name }
          onChange={ handleChange }
        >
          {options.map((option, index) => <option key={ index }>{option}</option>)}
        </Select>
      </Label>
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
