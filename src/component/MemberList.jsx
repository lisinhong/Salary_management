import React, { Component } from 'react';
import MemberInput from './MemberInput.jsx';

export default class MemberList extends Component {
  constructor(props) {
    super(props);
    this.addMember = this.addMember.bind(this);
  }
  addMember(name) {
    this.props.addMember(name);
  }
  render() {
    return (
      <div className="member-container">
        <MemberInput addMember={this.addMember} />
      </div>
    )
  }
}
