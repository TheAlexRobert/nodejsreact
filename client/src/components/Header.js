import React, { Component } from 'react';
//L80 - let Header know user logged in
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

    //helper method
    renderContent() {
        switch (this.props.auth) {
            case null: 
                return;

            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
         

            default: 
                return <li><a href="/api/logout">Logout</a> </li>; //send back to root route
             
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