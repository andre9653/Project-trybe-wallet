import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  height: 1em;
  margin: 8px 0;
  padding: 12px 20px;
  width: 20vw;
`;
const Label = styled.label`
  padding: 5px;
`;
export default class InputForm extends React.Component {
  render() {
    const { name, handleChange, labelText, value } = this.props;
    return (
      <Label htmlFor={ name }>
        {labelText}
        <Input
          type="text"
          id={ name }
          name={ name }
          value={ value }
          onChange={ handleChange }
        />
      </Label>
    );
  }
}

InputForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
