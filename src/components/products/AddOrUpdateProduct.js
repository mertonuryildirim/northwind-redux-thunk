import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { saveProduct } from '../../redux/actions/productActions';
import ProductDetail from './ProductDetail';

const AddOrUpdateProduct = ({
    products,
    categories,
    getProducts,
    getCategories,
    saveProduct,
    history,
    ...props
}) => {
    const [product, setProuct] = useState({ ...props.product });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (categories.length === 0) {
            getCategories();
        }
        setProuct({ ...props.product });
    }, [props.product, categories, getCategories]);

    function handleChange(event) {
        const { name, value } = event.target;
        setProuct((previousProduct) => ({
            ...previousProduct,
            [name]: name === 'categoryId' ? parseInt(value, 10) : value,
        }));
        validate(name, value);
    }

    function validate(name, value) {
        if (name === 'productName' && value === '') {
            setErrors((previousErrors) => ({
                ...previousErrors,
                productName: 'Ürün ismi olmalıdır',
            }));
        } else {
            setErrors((previousErrors) => ({
                ...previousErrors,
                productName: '',
            }));
        }
    }

    function handleSave(event) {
        event.preventDefault();
        saveProduct(product).then(() => {
            history.push('/');
        });
    }

    return (
        <div>
            <ProductDetail
                product={product}
                categories={categories}
                onChange={handleChange}
                onSave={handleSave}
                errors={errors}
            />
        </div>
    );
};

function getProductById(products, productId) {
    // eslint-disable-next-line eqeqeq
    let product = products.find((product) => product.id == productId) || null;
    return product;
}

function mapStateToProps(state, ownProps) {
    const productId = ownProps.match.params.productId;
    const product =
        productId && state.productListReducer.length > 0
            ? getProductById(state.productListReducer, productId)
            : {};
    return {
        product,
        products: state.productListReducer,
        categories: state.categoryListReducer,
    };
}

const mapDispatchToProps = {
    getCategories,
    saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
