import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import * as fromContact from './ducks/contact';

// THE FORM COMPONENT
class Contact extends Component {
  constructor(props) {
    super(props);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleBoldClick = this.handleBoldClick.bind(this);
  }
  handleKeyCommand(command) {
    const { editorState, onEditorChange } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  handleBoldClick() {
    const { editorState, onEditorChange } = this.props;
    onEditorChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }
  render() {
    const {
      editorState,
      handleSubmit,
      onEditorChange,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email"/>
        </div>
        <button type="button" onClick={this.handleBoldClick}>Bold</button>
        <Editor
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={onEditorChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
Contact.propTypes = {
  editorState: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}
// THE WRAPPED FORM COMPONENT
const ContactForm = reduxForm({
  form: 'contact'
})(Contact);
// THE EXPORTED COMPONENT
class ContactSubmit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {editorState: EditorState.createEmpty()};
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  handleEditorChange(editorState) {
    this.setState({editorState});
  }
  handleSubmit({ firstName, lastName, email }) {
    const { setContact } = this.props;
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    // EXECUTE CONNECTED SAMPLE ACTION CREATOR
    setContact({
      firstName,
      lastName,
      email,
      html,
    })
  }
  render() {
    return (
      <ContactForm
        editorState={this.state.editorState}
        onEditorChange={this.handleEditorChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
ContactSubmit.propTypes = {
  setContact: PropTypes.func.isRequired,
};
export default connect(
  null,
  {
    // CONNECT SAMPLE ACTION CREATOR
    setContact: fromContact.setContact,
  }
)(ContactSubmit);
