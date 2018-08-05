import React, { Component }  from 'react';

export default class SalaryTableHeader extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let memberList = this.props.memberList;
    return (
      <div className="table-row table-header">
        <div>Date Range</div>
        {
          memberList.map((member, index) => <div key={index}>{member}</div>)
        }
      </div>
    )
  }
}