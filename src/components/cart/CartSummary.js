import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    NavItem,
    NavLink,
    UncontrolledDropdown,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import alertify from 'alertifyjs';
import { Link } from 'react-router-dom';

class CartSummary extends Component {
    handleRemoveFromCart = (product) => {
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + ' deleted from cart.!');
    };

    renderEmpty = () => {
        return (
            <NavItem>
                <NavLink>Your cart is empty.!</NavLink>
            </NavItem>
        );
    };

    renderSummary = () => {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Your Cart
                </DropdownToggle>
                <DropdownMenu right>
                    {this.props.cart.map((cartItem) => (
                        <DropdownItem key={cartItem.product.id}>
                            <Badge
                                onClick={() =>
                                    this.handleRemoveFromCart(cartItem.product)
                                }
                                color="danger"
                            >
                                X
                            </Badge>
                            &nbsp;
                            {cartItem.product.productName}&nbsp;
                            <Badge color="success">{cartItem.quantity}</Badge>
                        </DropdownItem>
                    ))}
                    <DropdownItem divider />
                    <DropdownItem>
                        <Link to="/cart">Go to Cart</Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    };

    render() {
        return (
            <div>
                {this.props.cart.length > 0
                    ? this.renderSummary()
                    : this.renderEmpty()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cartReducer,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(removeFromCart, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
