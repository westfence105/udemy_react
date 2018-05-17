import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
    render(){
        return (
            <form className="search-form" onSubmit={ e => this.handleSubmit( e ) }>
                <input type="text" value={this.props.place}
                       className="place-input" size="30"
                       value={ this.props.place }
                       onChange={ e => this.props.onPlaceChange( e.target.value )}/>
                <input type="submit" value="検索" className="submit-button" />
            </form>
        );
    }

    handleSubmit( e ){
        e.preventDefault(); //submitのdefaultの動きをキャンセル
        this.props.onSubmit();
    }
}

SearchForm.propTypes = {
    place: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onPlaceChange: PropTypes.func.isRequired,
};

export default SearchForm;
