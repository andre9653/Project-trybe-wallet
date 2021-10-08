import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderStyle = styled.header`
  align-items: center;
  background-color: #2354d8;
  display: flex;
  height: 10vh;
  justify-content: space-evenly;
  width: 100vw;
`;

const Li = styled.li`
  color: white;
  font-size: 1.5em;
  list-style: none;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moeda: 'BRL',
    };
  }

  render() {
    const { userState, expenditure } = this.props;
    const { moeda } = this.state;
    return (
      <HeaderStyle>
        <Li data-testid="email-field">{userState}</Li>
        <Li>
          Despesa total: R$
          <span data-testid="total-field">
            {' '}
            {expenditure}
          </span>
        </Li>
        <Li data-testid="header-currency-field">{moeda}</Li>
      </HeaderStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.user.email,
  expenditure: state.wallet.expenditure,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  userState: PropTypes.string.isRequired,
  expenditure: PropTypes.number.isRequired,
};
