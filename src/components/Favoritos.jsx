import React, { Component } from 'react'
import Axios from 'axios';
import { DATA_API_URL } from './config';
import '../css/Favoritos.css'

export class Favoritos extends Component {

    getFavorites = () => {
        Axios.get(`${DATA_API_URL}/jokes`)
            .then(
                res => {
                    this.setState({
                        favs: res.data
                    })
                    console.log(res.data);
                }
            )
    }

    onDeleteHandler = (id) => {
        this.props.delete(id);
    }

    componentDidMount() {
        this.getFavorites();
    }

    render() {
        //console.log('favoritos: ',this.props)
        return (
            
            <div className='ui items'>
            <h1 className="ui header">Favoritos</h1>
                {this.props.favoritos.map(
                    item =>
                        <div key={item.id} className='ui card'>
                            <div className='content'>
                                <div className='header'>Favorite Joke</div>
                                <div className='meta'>{`Categoría: ${item.categoria}`}</div>
                                {item.value}
                            </div>
                            <div className="ui basic red button" onClick={() => this.onDeleteHandler(item.id)} >Eliminar</div>
                        </div>
                )}
            </div>
        )
    }
}

export default Favoritos
