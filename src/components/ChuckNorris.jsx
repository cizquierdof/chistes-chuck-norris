import React, { Component } from 'react'
import ListaCategorias from './ListaCategorias'
import Header from './Header'
import Joke from './Joke'
import '../css/ChuckNorris.css'
import Axios from 'axios'
import { BASE_URL, DATA_API_URL } from './config'
import Favoritos from './Favoritos'

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

    componentDidMount() {
        this.getJoke();
        this.getFavorites();
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log(this.state.url, '--', prevState.url)
        if (this.state.url !== prevState.url)
            this.getJoke();
    }

    render() {
        return (
            <div className='container'>
                <div className='div-header'>
                    <Header />
                </div>
                <div className='div-categorias'>
                    <ListaCategorias setCategoria={this.setCategoria} />
                </div>
                <div className='div-joke'>
                    <Joke randomJoke={this.state.randomJoke}
                        categoria={this.state.cat || 'Random'}
                        setFavorito={this.setFavorito} />
                </div>
                <div  className='div-favoritos'>
                <Favoritos favoritos={this.state.favoritos}
                    delete={this.deleteFavorito} />
                </div>
            </div>
        )
    }
}

export default ChuckNorris
