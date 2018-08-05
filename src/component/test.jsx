import React, { Component } from 'react';

export default class Demo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			points: 0
		}
		this.addPoint = this.addPoint.bind(this);
	}
	addPoint() {
		let amount = Math.round(Math.random() * 10);
		console.log(amount)
		this.setState(prevState => ({
			points: prevState.points + amount 
		}))
	}
	render() {
		return (
			<div>
				<div>{this.state.points}</div>
				<button onClick={this.addPoint}>click!</button>
			</div>
		)
	}
}