import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { addToCart } from '../../redux/actions/cartActions';
import { getProducts } from '../../redux/actions/productActions';
import alertify from 'alertifyjs';
import { Link } from 'react-router-dom';

class ProductList extends Component {
    handleAddToCart = (product) => {
        this.props.actions.addToCart({ quantity: 1, product });
        alertify.success(product.productName + 'added to cart.!', 2);
    };

    componentDidMount() {
        this.props.actions.getProducts();
    }
    render() {
        return (
            <div>
                <h3>
                    <Badge color="warning">Products</Badge>
                    &nbsp;
                    <Badge color="success">
                        {this.props.currentCategory.categoryName}
                    </Badge>
                </h3>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity Per Unit</th>
                            <th>Units in Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map((product) => (
                            <tr key={product.id}>
                                <th scope="row">{product.id} </th>
                                <td>
                                    <Link to={'/saveproduct/' + product.id}>
                                        {product.productName}
                                    </Link>
                                </td>
                                <td>{product.unitPrice}</td>
                                <td>{product.quantityPerUnit}</td>
                                <td>{product.unitsInStock}</td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            this.handleAddToCart(product)
                                        }
                                        color="primary"
                                        size="sm"
                                    >
                                        Add to Cart
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
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getProducts: bindActionCreators(getProducts, dispatch),
            addToCart: bindActionCreators(addToCart, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
