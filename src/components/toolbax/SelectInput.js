import React from 'react';
import { connect } from 'react-redux';

const SelectInput = ({
    name,
    label,
    onChange,
    defaultOption,
    value,
    error,
    options,
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                className="form-control"
                name={name}
                onChange={onChange}
                value={value}
            >
                <option value="">{defaultOption}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectInput);
