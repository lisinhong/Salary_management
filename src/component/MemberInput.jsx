import React, { Component } from 'react';

export default class MemberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    },
      this.addMember = this.addMember.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }
  addMember(e) {
    e.preventDefault();
    const name = this.state.inputValue;
    this.props.addMember(name);
  }

  render() {
    return (
      <div className="member-input-container">
        <form onSubmit={this.addMember}>
          <div className="title">
            Add Member Name
          </div>
          <div className="input-container">
            <label htmlFor="input-member">Member Name</label>
            <input type="text" id="input-member" value={this.state.inputValue} onChange={this.handleInputChange} />
          </div>
          <div className="submit-container">
            <input type="submit" value="SUBMIT" />
            <input type="button" value="CANCEL" onClick={this.props.unmountMemberInput} />
          </div>
        </form>
      </div>
    )
  }
}