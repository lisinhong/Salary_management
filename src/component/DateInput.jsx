import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sd: '',
      ed: '',
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.addDateRange = this.addDateRange.bind(this);
  }
  handleDateChange(type, value) {
    if (type === 'sd') {
      this.setState({
        sd: value
      });
    }
    else if (type === 'ed') {
      this.setState({
        ed: value
      });
    }
  }
  addDateRange(e) {
    e.preventDefault();
    const sd = this.state.sd;
    const ed = this.state.ed;
    this.props.addDateRange(sd, ed);
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
            <label htmlFor='input-ed'>End Date</label>
            <DatePicker
              id='input-ed'
              onChange={(date) => { this.handleDateChange('ed', date) }}
              selected={this.state.ed ? this.state.ed : null}
              placeholderText='End Date'
              dateFormat='YYYY-MM-DD' />
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