import React from 'react';
import PropTypes from 'prop-types';

const HotelsClickableTh = ({ label, sortKey, onSort, isSelected }) => (
                <th className="hotels-clickable-th" onClick={ () => onSort( sortKey ) }>
                    {label}{ isSelected ? '▲' : '' }
                </th>
);

HotelsClickableTh.propTypes = {
    label: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};

export default HotelsClickableTh;
