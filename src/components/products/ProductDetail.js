import React from 'react';
import { connect } from 'react-redux';
import SelectInput from '../toolbax/SelectInput';
import TextInput from '../toolbax/TextInput';

const ProductDetail = ({ categories, product, onSave, onChange, errors }) => {
    return (
        <form onSubmit={onSave}>
            <h2>{product.id ? 'Güncelle' : 'Ekle'}</h2>
            <TextInput
                name="productName"
                label="Product Name"
                placeHolder="Please enter product name"
                value={product.productName}
                onChange={onChange}
                error={errors.productName}
            />
            <SelectInput
                name="categoryId"
                label="Categories"
                value={product.categoryId || ''}
                defaultOption="Seçiniz"
                options={categories.map((category) => ({
                    value: category.id,
                    text: category.categoryName,
                }))}
                onChange={onChange}
                error={errors.categoryId}
            />
            <TextInput
                name="unitPrice"
                label="Unit Price"
                placeHolder="Please enter unit price"
                value={product.unitPrice}
                onChange={onChange}
                error={errors.unitPrice}
            />
            <TextInput
                name="quantityPerUnit"
                label="Quantity Per Unit"
                placeHolder="Please enter quantity per unit"
                value={product.quantityPerUnit}
                onChange={onChange}
                error={errors.quantityPerUnit}
            />
            <TextInput
                name="unitsInStock"
                label="Units in Stock"
                placeHolder="Please enter units in stock"
                value={product.unitsInStock}
                onChange={onChange}
                error={errors.unitsInStock}
            />
            <button type="submit" className="btn btn-success">
                Save
            </button>
        </form>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
