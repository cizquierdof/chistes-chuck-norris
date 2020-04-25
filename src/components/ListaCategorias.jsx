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
            .then(res =>{
                this.setState({categorias: res.data});
            }).catch(
                console.log
            )
    }

    render() {
        //console.log('props',this.props)
        return (
            <div className='ui list'>
                {this.state.categorias.map(
                    items=>
                    
                    <div key={items} className="item" onClick={()=>this.props.setCategoria(items)}>
                    <i className="folder icon"></i>
                    <div className="content">
                        <div className="header">{items}</div>
                    </div>
                </div>
                
                )}


            </div>
        )
    }
}

export default Listacategorias
