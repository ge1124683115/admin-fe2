import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Switch,Route,Redirect,Link} from 'react-router-dom';
import Home from 'page/home/index.jsx';

class App extends React.Component{
	render(){
		return(
			<Router>
				<div>
					<Route exact path="/" component = {Home}/>
					<Redirect from="*" to="/"/>
				</div>
			</Router>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);