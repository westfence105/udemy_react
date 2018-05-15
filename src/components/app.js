import React, { Component } from 'react';

import Greeting from './greeting';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "John",
        };
    }

    render(){
        return (
            <div>
                <input type="text" value={this.state.name} onChange={ e => this.handleNameChange(e.target.value)} />
                <Greeting name={this.state.name} />
            </div>
        );
    }

    handleOnMouseOver(){
        //setStateを呼べば再描画までされる（代入ではされない）
    //    this.setState({ name: "Bob" });
    }

    handleOnMouseOut(){
    //    this.setState({ name: "Mike" });
    }

    handleNameChange( name ){
        this.setState({ name }); //キーと同名の変数はキーを入力する必要がない
    }
}

export default App;
