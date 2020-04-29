import React, { Component } from 'react'
import ListaCategorias from './ListaCategorias'
import Joke from './Joke'
import '../css/ChuckNorris.css'
import Axios from 'axios'
import { BASE_URL, DATA_API_URL } from './config'
import Favoritos from './Favoritos'
import {Link} from 'react-router-dom'

export class ChuckNorris extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            randomJoke: '',
            cat: null,
            url: BASE_URL + '/random',
            favoritos: []
        }
    }

    setCategoria = (categoria) => {
        //console.log(`${categoria} is here`);
        const newUrl = BASE_URL + 'random?category=' + categoria;
        this.setState({
            url: newUrl,
            cat: categoria
        })
    }

    getJoke = () => {
        Axios.get(this.state.url)
            .then(
                res =>
                    this.setState({
                        randomJoke: res.data.value
                    })
            ).catch(console.log)
    }

    getFavorites = () => {
        Axios.get(`${DATA_API_URL}/jokes`)
            .then(
                res => {
                    this.setState({
                        favoritos: res.data
                    })
                    console.log(res.data);
                }
            )
    }

    setFavorito = () => {
        const joke = {
            id: this.state.id,
            categoria: this.state.cat,
            value: this.state.randomJoke
        }
        Axios.post(`${DATA_API_URL}/jokes`, joke).then(
            res => {
                console.log('Favorito guardado');
                this.setState({
                    favoritos: [...this.state.favoritos, res.data]
                })
            }
        ).catch(console.log);
    }

    deleteFavorito = (id) => {

        Axios.delete(`${DATA_API_URL}/jokes/${id}/`)
            .then(
                res => {
                    console.log('chiste borrado: ', res.data);
                    this.getFavorites();
                }
            )
    }

    onClickPDFHandler = () => {
    }

    componentDidMount() {
        this.getJoke();
        this.getFavorites();
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log(this.state.url, '--', prevState.url)
        // if (this.state.cat !== prevState.cat)
        //     this.getJoke();
        if (this.state.randomJoke === prevState.randomJoke)
            this.getJoke();

    }
    

    render() {
        return (
            <div className='chuck-norris'>
                <ListaCategorias setCategoria={this.setCategoria} />
                <Joke randomJoke={this.state.randomJoke}
                        categoria={this.state.cat || 'Random'}
                        setFavorito={this.setFavorito} />
                <div className='div-favoritos'>
                    <Link to='/pdf' className="ui labeled icon button">
                        <i className="file pdf icon outline red"></i>
                        Mostrar como PDF
                    </Link>
                <Favoritos favoritos={this.state.favoritos}
                        delete={this.deleteFavorito} />
                </div>
            </div>
        )
    }
}

export default ChuckNorris
