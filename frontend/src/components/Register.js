import React from 'react';
import { Link } from 'react-router-dom';

export default function Register({
  handleInputEmail,
  handleInputPassword,
  email,
  password,
  handleSubmitRegister,
}) {
  return (
    <section className={`entry entry_type_signup`}>
      <h2 className="entry__title">Sign up</h2>
      <form className="entry__form" onSubmit={handleSubmitRegister}>
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
          Sign up
        </button>
      </form>
      <Link to="/signin" className="link link__hover entry__redirect-text">
        Already a member? Log in here!
      </Link>
    </section>
  );
}
