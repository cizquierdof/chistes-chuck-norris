import React, { Component } from 'react'
import ListaCategorias from './ListaCategorias'
import Header from './Header'
import Joke from './Joke'
import '../css/ChuckNorris.css'
import Axios from 'axios'

export class ChuckNorris extends Component {

    constructor(props) {
        super(props);
        this.state = {
            randomJoke:[]
        }
    }

    setCategoria=(categoria)=>{
        console.log(`${categoria} is here`);
        Axios.get(`https://api.chucknorris.io/jokes/random?category=${categoria}`)
            .then(
                res=> 
                //console.log(res.data)
                this.setState({
                    randomJoke:res.data.value
                })
            )
            .catch(
                console.log(Error)
            )
    }

    render() {
        console.log('random',this.state.randomJoke);
        return (
            <div className='container'>
                <div className='div-header'>
                    <Header />
                </div>
                <div className='div-lista'>
                    <ListaCategorias setCategoria={this.setCategoria} />
                </div>
                <div className='div-joke'>
                    <Joke randomJoke={this.state.randomJoke}/>
                </div>
            </div>
        )
    }
}

export default ChuckNorris
