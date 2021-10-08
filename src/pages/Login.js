import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { addValue } from '../actions';

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  margin: 8px 0;
  padding: 12px 20px;
  width: 20vw;
`;
const Button = styled.button`
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin: 8px 0;
  padding: 14px 20px;
  width: 20vw;
`;

const Main = styled.main`
  background-color: #f2f2f2;
  border-radius: 5px;
  height: 100vh;
  justify-content: center;
  margin: auto;
  text-align: center;
  width: 100vw;
`;

const H1 = styled.h1`
  display: block;
  text-align: center;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validLogin: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validLogin = this.validLogin.bind(this);
    this.handelClick = this.handelClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.validLogin());
  }

  validLogin(value = '') {
    // regex, breve pesquisa no stack overflow em https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const validationEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minLength = 8;
    const { email, password } = this.state;
    const validEmail = validationEmailRegex.test(email) && email.length >= minLength;
    const validationPasswordRegex = /^[a-zA-Z0-9]{6,}$/;
    const validPassword = validationPasswordRegex.test(`${password}${value}`);

    if (validEmail && validPassword) this.setState({ validLogin: true });
    else this.setState({ validLogin: false });
  }

  handelClick() {
    const { email } = this.state;
    const { addEmail } = this.props;
    this.setState({ redirect: true });
    return addEmail('LOGIN_EMAIL', email);
  }

  render() {
    const { email, password, validLogin, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <Main>
        <H1>Login Wallet</H1>
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
        />
        <Input
          name="password"
          type="password"
          value={ password }
          placeholder="senha"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <Button
          type="button"
          disabled={ !validLogin }
          onClick={ this.handelClick }
        >
          Entrar
        </Button>
      </Main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (type, value) => dispatch(addValue(type, value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
};
