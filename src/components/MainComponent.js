import React, {Component} from 'react';
import Header from './HeaderComponent';
import Http from './HttpComponent';
import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component{
	constructor(props){
		super(props);
		this.state={
			transactions:[],
		}
	}
    render(){
		const TransactionPage=()=>{
			return(
				<Http />
			);
		};
		return(
			<div>
				<Header/>
				<Http/>
				<Switch>
					<Route path="/" Component={TransactionPage}/>
					<Redirect to="/"/>
				</Switch>
			</div>
		)
	}

}

export default Main;