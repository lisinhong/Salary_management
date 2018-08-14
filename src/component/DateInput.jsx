import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sd: '',
      ed: '',
      isSdValid: true,
      isEdValid: true,
      errorMsg: '* Invalid date'
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.addDateRange = this.addDateRange.bind(this);
  }
  handleDateChange(type, value) {
    if (type === 'sd') {
      this.setState({
        sd: value,
        isSdValid: true
      });
    }
    else if (type === 'ed') {
      this.setState({
        ed: value,
        isEdValid: true
      });
    }
  }
  validateDateInput() {
    const sd = this.state.sd;
    const ed = this.state.ed;
    if (moment(sd).isValid()) {
      this.setState({
        isSdValid: true
      });
    }
    else {
      this.setState({
        isSdValid: false
      });
    }
    if (moment(ed).isValid()) {
      this.setState({
        isEdValid: true
      });
    }
    else {
      this.setState({
        isEdValid: false
      });
    }
    return (moment(sd).isValid() && moment(ed).isValid());
  }
  addDateRange(e) {
    e.preventDefault();
    const sd = this.state.sd;
    const ed = this.state.ed;
    if(this.validateDateInput()) this.props.addDateRange(sd, ed);
    else return;
  }
  render() {
    return (
      <div className="date-input-container">
        <form onSubmit={this.addDateRange}>
          <div className="title">
            Add Date Range
          </div>
          <div className="input-container">
            <label htmlFor='input-sd'>Start Date</label>
            <DatePicker
              id='input-sd'
              onChange={(date) => { this.handleDateChange('sd', date) }}
              selected={this.state.sd ? this.state.sd : null}
              placeholderText='Start Date'
              dateFormat='YYYY-MM-DD' />
            {
              (!this.state.isSdValid) ?
                <p className="error-msg">{this.state.errorMsg}</p> :
                null
            }
            <label htmlFor='input-ed'>End Date</label>
            <DatePicker
              id='input-ed'
              onChange={(date) => { this.handleDateChange('ed', date) }}
              selected={this.state.ed ? this.state.ed : null}
              placeholderText='End Date'
              dateFormat='YYYY-MM-DD' />
            {
              (!this.state.isEdValid) ?
                <p className="error-msg">{this.state.errorMsg}</p> :
                null
            }
          </div>
          <div className="submit-container">
            <input type="submit" value="SUBMIT" />
            <input type="button" value="CANCEL" onClick={this.props.unmountDateInput} />
          </div>
        </form>
      </div>
    )
  }
}