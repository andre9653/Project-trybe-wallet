import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Th = styled.th`
  background-color: #094bff;
  border-left: solid 1px #bcceff;
  color: white;
  padding-bottom: 12px;
  padding-top: 12px;
  text-align: center;
`;
const Tr = styled.tr`
  display: grid;
  grid-template-columns: 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr;
`;

export default class LineOfTable extends React.Component {
  render() {
    const { textLine, typeTable, id } = this.props;
    if (typeTable === 'th') {
      return (
        <Tr>
          {textLine.map((description, index) => <Th key={ index }>{description}</Th>)}
        </Tr>
      );
    }
    return (
      <Tr>
        {textLine
          .map((description, index) => (
            <td id={ id } key={ index }>{description}</td>
          ))}
      </Tr>
    );
  }
}

LineOfTable.propTypes = {
  textLine: PropTypes.arrayOf(PropTypes.string).isRequired,
  typeTable: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
