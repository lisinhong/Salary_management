import React, { Component } from 'react';
import update from 'immutability-helper';
import moment from 'moment';
import SalaryTable from './SalaryTable.jsx';
import DateInput from './DateInput.jsx';
import MemberInput from './MemberInput.jsx';
import Modal from 'react-awesome-modal';

export default class SalaryManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList: ['mary', 'bob', 'alice', 'leo'],
      salaryDetail: [], // [{ sd, ed, info: [{ name, salary, isSent, isReceived, remarks }]}]
      isAddingDate: false,
      isAddingMember: false
    };
    this.addMember = this.addMember.bind(this);
    this.addDateRange = this.addDateRange.bind(this);
    this.updateDateRange = this.updateDateRange.bind(this);
    this.updateDetailInfo = this.updateDetailInfo.bind(this);
    this.mountDateInput = this.mountDateInput.bind(this);
    this.unmountDateInput = this.unmountDateInput.bind(this);
    this.mountMemberInput = this.mountMemberInput.bind(this);
    this.unmountMemberInput = this.unmountMemberInput.bind(this);
  }
  addMember(name) {
    const memberList = this.state.memberList;
    const salaryDetail = this.state.salaryDetail;
    const newMemberInfo = {
      name: name,
      salary: 0,
      isSent: false,
      isReceived: false,
      remarks: ''
    };
    memberList.push(name);
    salaryDetail.forEach((detail) => {
      detail.info.push(newMemberInfo);
    })
    this.setState({
      isAddingMember: false,
      memberList: memberList,
      salaryDetail: salaryDetail
    });
  }
  addDateRange(sd, ed) {
    const salaryDetail = this.state.salaryDetail;
    const memberList = this.state.memberList;
    const initialInfo = memberList.map((member) => ({
      name: member,
      salary: 0,
      isSent: false,
      isReceived: false,
      remarks: ''
    }));
    salaryDetail.push({
      sd: sd,
      ed: ed,
      info: initialInfo
    });
    this.setState({
      salaryDetail: salaryDetail,
      isAddingDate: false
    });
  }
  updateDateRange(detailIndex, type, value) {
    const salaryDetail = this.state.salaryDetail;
    salaryDetail[detailIndex][type] = value;
    this.setState({
      salaryDetail: salaryDetail
    })
  }
  updateDetailInfo(detailIndex, memberIndex, type, value) {
    const salaryDetail = this.state.salaryDetail;
    const newSalaryDetail = update(salaryDetail, {
      [detailIndex]: {
        info: {
          [memberIndex]: {
            [type]: {
              $set: value
            }
          }
        }
      }
    });
    this.setState({
      salaryDetail: newSalaryDetail
    })
  }
  mountDateInput() {
    this.setState({
      isAddingDate: true
    })
  }
  unmountDateInput() {
    this.setState({
      isAddingDate: false
    })
  }
  mountMemberInput() {
    this.setState({
      isAddingMember: true
    })
  }
  unmountMemberInput() {
    this.setState({
      isAddingMember: false
    })
  }
  componentWillMount() {
    this.addDateRange(moment('2018-07-10'), moment('2018-07-12'));
    this.addDateRange(moment('2018-07-10'), moment('2018-07-12'));
    this.addDateRange(moment('2018-07-10'), moment('2018-07-12'));
  }
  render() {
    return (
      <div>
        <div className="add-input-container">
          <input type="button" value="New Date" onClick={this.mountDateInput} />
          <input type="button" value="New Member" onClick={this.mountMemberInput} />
        </div>
        <SalaryTable
          memberList={this.state.memberList}
          salaryDetail={this.state.salaryDetail}
          updateDetailInfo={this.updateDetailInfo}
          updateDateRange={this.updateDateRange} />
        <Modal
          visible={this.state.isAddingDate}
          width="400"
          height="300"
          onClickAway={() => this.unmountDateInput()}>
          {
            this.state.isAddingDate ?
              <DateInput
                addDateRange={this.addDateRange}
                unmountDateInput={this.unmountDateInput} /> :
              null
          }
        </Modal>
        <Modal
          visible={this.state.isAddingMember}
          width="400"
          height="300"
          onClickAway={() => this.unmountMemberInput()}>
          {
            this.state.isAddingMember ?
              <MemberInput
                addMember={this.addMember}
                unmountMemberInput={this.unmountMemberInput} /> :
              null
          }
        </Modal>
      </div>
    )
  }
}