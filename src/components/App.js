import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from "./SearchForm";
import GeocodeResult from "./GeocodeResult"
import Map from "./Map"

const GEOCODE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <div>
                <h1>緯度経度検索</h1>
                <SearchForm onSubmit={ place => this.handlePlaceSubmit( place ) } />
                <GeocodeResult
                    address={ this.state.address }
                    lat={ this.state.lat } lng={ this.state.lng }
                />
                <Map { ...this.state } />
            </div>
        );
    }

    setErrorMessage( msg ){
        this.setState({
            address: msg,
            lat: 0,
            lng: 0,
        });
    }

    handlePlaceSubmit( place ){
        axios.get( GEOCODE_ENDPOINT, { params: { address: place } } )
             .then( results => {
                console.log( results );
                const status = results.data.status;
                if( status == "OK" ){
                    const result = results.data.results[0];
                    const location = result.geometry.location;
                    this.setState({
                        address: result.formatted_address,
                        lat: location.lat,
                        lng: location.lng,
                    });
                }
                else if( status == "ZERO_RESULTS" ) {
                    this.setErrorMessage("結果が見つかりませんでした");
                }
                else {
                    this.setErrorMessage("エラーが発生しました");
                }
              })
             .catch( (error) => {
                 console.log(error);
                 this.setErrorMessage("通信エラーが発生しました")
             });
    }
}

export default App;
