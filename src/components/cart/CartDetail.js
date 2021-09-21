import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import alertify from 'alertifyjs';

class CartDetail extends Component {
    handleRemoveFromCart = (product) => {
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + ' removed from cart.!');
    };
    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map((cartItem) => (
                            <tr key={cartItem.id}>
                                <th scope="row">{cartItem.product.id} </th>
                                <td>{cartItem.product.productName}</td>
                                <td>{cartItem.product.unitPrice}</td>
                                <td>{cartItem.quantity}</td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            this.handleRemoveFromCart(
                                                cartItem.product,
                                            )
                                        }
                                        color="danger"
                                        size="sm"
                                    >
                                        Remove From Cart
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
