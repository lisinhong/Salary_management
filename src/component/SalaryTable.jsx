import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default class SalaryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRangeList: [],
    };
  }
  render() {
    const salaryDetail = this.props.salaryDetail;
    const memberList = this.props.memberList;
    return (
      <div className="salary-table">
        <div className="table-content">
          <div className="table-col-date">
            <div className="table-header"><div></div></div>
            {
              salaryDetail.map((detail, detailIndex) => {
                return (
                  <div className="table-date" key={`row-${detailIndex}`}>
                    <div>
                      <DatePicker
                        onChange={(date) => { this.props.updateDateRange(detailIndex, 'sd', date) }}
                        selected={moment(detail.sd)}
                        placeholderText='Start Date'
                        dateFormat='YYYY-MM-DD' />
                    </div>
                    <div>|</div>
                    <div>
                      <DatePicker
                        onChange={(date) => { this.props.updateDateRange(detailIndex, 'ed', date) }}
                        selected={moment(detail.ed)}
                        placeholderText='End Date'
                        dateFormat='YYYY-MM-DD' />
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="table-col-detail">
            <div className="table-header">
              {
                memberList.map((member, memberIndex) => {
                  return (
                    <div key={`member-${memberIndex}`}>
                      <input
                        type="text"
                        value={member}
                        placeholder="Member Name"
                        onChange={(e) => { this.props.updateMemberList(memberIndex, e.target.value) }} />
                    </div>
                  )
                })
              }
            </div>
            {
              salaryDetail.map((detail, detailIndex) => {
                return (<div className="table-row">
                  {
                    detail.info.map((info, infoIndex) => {
                      return (
                        <div className="table-detail" key={`detail-info-${detailIndex}-${infoIndex}`}>
                          <p>Salary:
                            <input type="number"
                              value={info.salary} onChange={(e) => {
                                this.props.updateDetailInfo(detailIndex, infoIndex, 'salary', e.target.value)
                              }} />
                          </p>
                          <p>Is sent:
                            <input type="checkbox"
                              checked={info.isSent} onChange={(e) => {
                                this.props.updateDetailInfo(detailIndex, infoIndex, 'isSent', e.target.checked);
                              }} />
                          </p>
                          <p>Is received:
                            <input type="checkbox"
                              checked={info.isReceived} onChange={(e) => {
                                this.props.updateDetailInfo(detailIndex, infoIndex, 'isReceived', e.target.checked)
                              }} />
                          </p>
                          <p>Remarks:
                            <textarea rows="2" value={info.remarks}
                              onChange={(e) => {
                                this.props.updateDetailInfo(detailIndex, infoIndex, 'remarks', e.target.value)
                              }}></textarea>
                          </p>
                        </div>
                      )
                    })
                  }
                </div>)
              })
            }
          </div>
        </div>
      </div>
    )
  }
}