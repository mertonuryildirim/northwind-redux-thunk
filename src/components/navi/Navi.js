import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import CartSummary from '../cart/CartSummary';

export default class Navi extends Component {
    state = {
        isOpen: false,
    };

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Northwind Redux</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse
                        style={{ justifyContent: 'flex-end' }}
                        isOpen={this.state.isOpen}
                        navbar
                    >
                        <Nav navbar>
                            <CartSummary />
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
