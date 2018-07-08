import React, { Component } from 'react';
//L80 - let Header know user logged in
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    //helper method
    renderContent() {
        switch (this.props.auth) { //comes from authReducers
            case null: 
                return;

            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
         

            default: 
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{ margin: '0 10px' }}>

                    Credits: {this.props.auth.credits}
                    
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a> </li> //send back to root route
                ];
        }
    }

    
    render() {
        console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'} //if this is an object? true : false
                        className="left brand-logo"
                    >
                    Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

//what content to show inside the header
//function mapStateToProps( { auth }) {
//    return { auth };
//}

function mapStateToProps({ auth }) {
    return { auth };
}



export default connect(mapStateToProps)(Header);