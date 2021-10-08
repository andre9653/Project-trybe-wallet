import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <header>
        <div>
          <li data-testid="email-field">{userState}</li>
          <li>
            Despesa total: R$
            <span data-testid="total-field">
              {' '}
              {expenditure}
            </span>
          </li>
          <li data-testid="header-currency-field">{moeda}</li>
        </div>
      </header>
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
