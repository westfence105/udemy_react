import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
    constructor( props ){
        super( props );

        this.state = {
            place: "",
        };
    }

    render(){
        return (
            <form className="search-form" onSubmit={ e => this.handleSubmit( e ) }>
                <input type="text" value={this.state.place}
                       className="place-input" size="30"
                       onChange={ e => this.handlePlaceChange( e.target.value )}/>
                <input type="submit" value="検索" className="submit-button" />
            </form>
        );
    }

    handleSubmit( e ){
        e.preventDefault(); //submitのdefaultの動きをキャンセル
        this.props.onSubmit( this.state.place );
    }

    handlePlaceChange( place ){
        this.setState({ place });
    }
}

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
