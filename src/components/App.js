import React, { Component } from 'react';
import _ from 'lodash';

import SearchForm from "./SearchForm";
import GeocodeResult from "./GeocodeResult";
import Map from "./Map";
import HotelsTable from "./HotelsTable";

import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

const sortedHotels = ( hotels, sortKey ) => _.sortBy( hotels, h => h[sortKey] );

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            address: "日本",
            location: {
                lat: 35.685175,
                lng: 139.7527995,
            },
            hotels: [],
            sortKey: 'price',
        };
    }

    handleSortKeyChange(sortKey){
        this.setState({ sortKey, hotels: sortedHotels( this.state.hotels, sortKey ) });
        console.log(sortKey);
    }

    render(){
        return (
            <div className="app">
                <h1 className="app-title">ホテル検索</h1>
                <SearchForm onSubmit={ place => this.handlePlaceSubmit( place ) } />
                <div className="result-area">
                    <Map { ...this.state } />
                    <div className="result-right">
                        <GeocodeResult { ...this.state } />
                        <h2>ホテル検索結果</h2>
                        <HotelsTable
                            hotels={ this.state.hotels }
                            onSort={ sortKey => this.handleSortKeyChange(sortKey) }
                            sortKey={ this.state.sortKey }
                        />
                    </div>
                </div>
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
        if( place == "" ){
            return;
        }
        geocode(place)
            .then( ({ status, address, location }) => {
                if( status == "OK" ){
                    this.setState({ address, location });
                    return searchHotelByLocation( location );
                }
                else if( status == "ZERO_RESULTS" ) {
                    this.setErrorMessage("結果が見つかりませんでした");
                }
                else {
                    this.setErrorMessage("エラーが発生しました");
                }
                return [];
              })
            .catch( (error) => {
            //    console.log(error);
                this.setErrorMessage("通信エラーが発生しました")
             })
            .then( (hotels) => {
                this.setState({ hotels: sortedHotels( hotels, this.state.sortKey ) });
            })
        ;
    }
}

export default App;
