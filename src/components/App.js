import React, { Component } from 'react';

import SearchForm from "./SearchForm";
import GeocodeResult from "./GeocodeResult"
import Map from "./Map"

import { geocode } from '../domain/Geocoder'

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            address: "日本",
            location: {
                lat: 35.685175,
                lng: 139.7527995,
            }
        };
    }

    render(){
        return (
            <div>
                <h1>緯度経度検索</h1>
                <SearchForm onSubmit={ place => this.handlePlaceSubmit( place ) } />
                <GeocodeResult { ...this.state } />
                <Map { ...this.state } />
            </div>
        );
    }

    setErrorMessage( msg ){
        this.setState({
            address: msg,
            location: {
                lat: 0,
                lng: 0,
            }
        });
    }

    handlePlaceSubmit( place ){
        geocode(place)
            .then( ({ status, address, location }) => {
                if( status == "OK" ){
                    this.setState({ address, location });
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
