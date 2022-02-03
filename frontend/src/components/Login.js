import React from 'react';
import { Link } from 'react-router-dom';

export default function Login({
  handleInputEmail,
  handleInputPassword,
  email,
  password,
  handleSubmitLogin,
}) {
  return (
    <section className={`entry entry_type_login`}>
      <h2 className="entry__title">Log in</h2>
      <form className="entry__form" onSubmit={handleSubmitLogin}>
        <input
          type="email"
          className="field-input field-input_type_entry"
          placeholder="Email"
          id="email-input"
          name="email"
          value={email || ''}
          onChange={handleInputEmail}
          required
        />
        <span className="error-message" id="email-input-error" />
        <input
          type="password"
          className="field-input field-input_type_entry"
          placeholder="Password"
          id="password-input"
          name="password"
          value={password || ''}
          onChange={handleInputPassword}
          required
          minLength="2"
          maxLength="40"
          pattern=".*\S.*"
        />
        <span className="error-message" id="password-input-error" />
        <button className="entry__save button button_hover_dark" type="submit">
          Log in
        </button>
      </form>
      <Link to="/signup" className="link link__hover entry__redirect-text">
        Not a member yet? Sign up here!
      </Link>
    </section>
  );
}
