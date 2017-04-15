import React from 'react';
import { connect } from 'react-redux';
import { getContact } from './ducks/contact';

const Display = ({ contact }) => {
  if (contact === null) return <div>No Contact</div>;
  // TODO: THINK ABOUT SANITIZING
  const createMarkup = () => ({ __html: contact.html });
  return (
    <div>
      <p><i>firstName</i>: {contact.firstName}</p>
      <p><i>lastName</i>: {contact.lastName}</p>
      <p><i>email</i>: {contact.email}</p>
      <p><i>html markup</i>:</p>
      {contact.html}
      <p><i>html rendered</i>:</p>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  )
};
export default connect(
  state => ({
    contact: getContact(state),
  }),
  null
)(Display);
