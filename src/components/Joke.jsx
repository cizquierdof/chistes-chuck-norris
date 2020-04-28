import React, { Component } from 'react'
import '../css/Joke.css'

export class Joke extends Component {

    onClickHandler = () => {
        this.props.setFavorito();
    }

    render() {
        //console.log('jokes props',this.props);
        return (
            <div className='div-joke'>
                <h1 className="ui header">Chiste {this.props.categoria}</h1>
                <div className='ui card'>
                    <div className='content'>
                        <div className='header'>Random Joke</div>
                        <div className='meta'>{`Categoría: ${this.props.categoria}`}</div>
                        {this.props.randomJoke}
                    </div>
                    <div className="ui basic green button" onClick={this.onClickHandler} >Favorito</div>
                </div>
            </div>
        )
    }
}

export default Joke
