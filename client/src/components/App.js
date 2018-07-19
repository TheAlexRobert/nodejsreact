import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'; //take all action creators and define to action's object

//L67
import Header from './Header';
//L85
import Landing from './Landing';
import Dashboard from './Dashboard';
//144
import SurveyNew from './surveys/SurveyNew'


//L77 - refactor to class
class App extends Component {

    //L77 
    componentDidMount(){
        this.props.fetchUser();
        
    }

    render(){
        return (
            <div className="container">
                
                <BrowserRouter> 
                    <div className="container">
                        <Header />
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/surveys" component={Dashboard}/>
                        <Route path="/surveys/new" component={SurveyNew}/>
                    </div>
    
                </BrowserRouter>
    
            </div>
        );

    }
    
}

export default connect(null, actions) (App);