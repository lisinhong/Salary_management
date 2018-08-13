import React, { Component } from 'react';
import update from 'immutability-helper';
import SalaryTable from './SalaryTable.jsx';
import DateInput from './DateInput.jsx';
import MemberInput from './MemberInput.jsx';
import Modal from 'react-awesome-modal';
import firebase from 'firebase';
import moment from 'moment';

export default class SalaryManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList: [],
      salaryDetail: [], // [{ sd, ed, info: [{ name, salary, isSent, isReceived, remarks }]}]
      isLoading: true,
      isAddingDate: false,
      isAddingMember: false,
    };
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCUhIyOZG7io3QM-X6SceWpu_v1WeWcAZA",
      authDomain: "salary-management-dc5d5.firebaseapp.com",
      databaseURL: "https://salary-management-dc5d5.firebaseio.com",
      projectId: "salary-management-dc5d5",
      storageBucket: "salary-management-dc5d5.appspot.com",
      messagingSenderId: "590692047198"
    };
    firebase.initializeApp(config);
    this.addMember = this.addMember.bind(this);
    this.addDateRange = this.addDateRange.bind(this);
    this.updateDateRange = this.updateDateRange.bind(this);
    this.updateDetailInfo = this.updateDetailInfo.bind(this);
    this.updateMemberList = this.updateMemberList.bind(this);
    this.mountDateInput = this.mountDateInput.bind(this);
    this.unmountDateInput = this.unmountDateInput.bind(this);
    this.mountMemberInput = this.mountMemberInput.bind(this);
    this.unmountMemberInput = this.unmountMemberInput.bind(this);
  }
  updateDbMemberList(memberList) {
    const dbMembers = firebase.database().ref('/members');
    dbMembers.set(memberList);
  }
  updateDbSalaryDetail(salaryDetail) {
    const dbSalaryDetail = firebase.database().ref('/salary-detail');
    dbSalaryDetail.set(salaryDetail);
  }
  addMember(name) {
    const memberList = this.state.memberList;
    const salaryDetail = this.state.salaryDetail;
    const newSalaryDetail = [...salaryDetail];
    const newMemberInfo = {
      name: name,
      salary: 0,
      isSent: false,
      isReceived: false,
      remarks: ''
    };
    newSalaryDetail.forEach((detail) => {
      detail.info.push(newMemberInfo);
    });
    this.setState({
      isAddingMember: false,
      memberList: [...memberList, name],
      salaryDetail: newSalaryDetail
    }, () => {
      this.updateDbMemberList(this.state.memberList);
      this.updateDbSalaryDetail(this.state.salaryDetail);
    });
  }
  addDateRange(sd, ed) {
    const salaryDetail = this.state.salaryDetail;
    const memberList = this.state.memberList;
    const newSalaryDetail = [...salaryDetail];
    const initialInfo = memberList.map((member) => ({
      name: member,
      salary: 0,
      isSent: false,
      isReceived: false,
      remarks: ''
    }));
    newSalaryDetail.push({
      sd: moment(sd).format('YYYY-MM-DD'),
      ed: moment(ed).format('YYYY-MM-DD'),
      info: initialInfo
    });
    this.setState({
      salaryDetail: newSalaryDetail,
      isAddingDate: false
    }, () => {
      this.updateDbSalaryDetail(this.state.salaryDetail);
    });
  }
  updateDateRange(detailIndex, type, value) {
    const salaryDetail = this.state.salaryDetail;
    const newSalaryDetail = update(salaryDetail, {
      [detailIndex]: {
        [type]: {
          $set: moment(value).format('YYYY-MM-DD')
        }
      }
    })
    this.setState({
      salaryDetail: newSalaryDetail
    }, () => {
      this.updateDbSalaryDetail(this.state.salaryDetail);
    });
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
    }, () => {
      this.updateDbSalaryDetail(this.state.salaryDetail);
    });
  }
  updateMemberList(memberIndex, member) {
    const memberList = this.state.memberList;
    const salaryDetail = this.state.salaryDetail;
    let newSalaryDetail = [];
    const newMemberList = [...memberList];
    newSalaryDetail = salaryDetail.map((detail) => {
      detail.info[memberIndex].name = member;
      return detail;
    });
    newMemberList[memberIndex] = member;
    this.setState({
      memberList: newMemberList,
      salaryDetail: newSalaryDetail
    }, () => {
      this.updateDbMemberList(this.state.memberList);
      this.updateDbSalaryDetail(this.state.salaryDetail);
    });
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
    const dbMembers = firebase.database().ref('/members');
    const memberList = [];
    dbMembers.once('value', (snapshot) => {
      snapshot.forEach((member) => {
        memberList.push(member.val());
      });
      this.setState({
        memberList: memberList
      });
    });
    const dbSalaryDetail = firebase.database().ref('/salary-detail');
    const salaryDetail = [];
    dbSalaryDetail.once('value', (snapshot) => {
      snapshot.forEach((detail) => {
        salaryDetail.push(detail.val());
      });
      this.setState({
        salaryDetail: salaryDetail,
        isLoading: false
      });
    });
  }
  render() {
    return (
      <div>
        {
          this.state.isLoading ?
            <div id="loader">
              <div className="loading-image">
              </div><div className="loading-text">Loading</div>
            </div> :
            null
        }
        <div className="add-input-container">
          <input type="button" value="NEW DATE" onClick={this.mountDateInput} />
          <input type="button" value="NEW MEMBER" onClick={this.mountMemberInput} />
        </div>
        <SalaryTable
          memberList={this.state.memberList}
          salaryDetail={this.state.salaryDetail}
          updateDetailInfo={this.updateDetailInfo}
          updateDateRange={this.updateDateRange}
          updateMemberList={this.updateMemberList} />
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