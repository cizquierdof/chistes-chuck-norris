import React, { Component } from 'react'
import Axios from 'axios';
import '../css/ListaCategorias.css'

export class Listacategorias extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categorias: []
        }
    }

    componentDidMount() {
        Axios.get('https://api.chucknorris.io/jokes/categories')
            .then(res => {
                this.setState({ categorias: res.data });
            }).catch(
                console.log
            )
    }

    render() {
        return (
            <div className='div-categorias'>
            <div className='ui items '>
            <h1 className="ui header">Categorías</h1>
                {this.state.categorias.map(
                    items =>
                        <div className="item" key={items} onClick={() => this.props.setCategoria(items)}>
                            <div className="ui icon">
                                <i className="folder icon"></i>
                            </div>
                            <div className="middle aligned content">
                                <p className="header">{items}</p>
                            </div>
                        </div>
                )}
            </div>
            </div>
        )
    }
}

export default Listacategorias
