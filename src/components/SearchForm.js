import React, { Component, PropTypes } from 'react';

class SearchForm extends Component {
    constructor( props ){
        super( props );

        this.state = {
            place: "",
        };
    }

    render(){
        return (
            <form onSubmit={ e => this.handleSubmit( e ) }>
                <input type="text" value={this.state.place} onChange={ e => this.handlePlaceChange( e.target.value )}/>
                <input type="submit" value="検索" />
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
