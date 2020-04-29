import React, { Component } from 'react'
import Axios from 'axios';
import { DATA_API_URL } from './config';
import { PDFViewer, Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';
import '../css/RenderPDF.css'
import { Link } from 'react-router-dom';

export class RenderPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritos: []
        }
    }

    componentDidMount() {
        Axios.get(`${DATA_API_URL}/jokes`).then(
            res => this.setState({
                favoritos: res.data
            })
        );
        console.log(this.state.favoritos);
    }

    render() {

        const styles = StyleSheet.create({
            page: {
                marginTop: 20,
                marginBottom: 20,
                marginRight: 10,
                marginLeft: 10,
                padding: 20,
                flexDirection: 'column',
                backgroundColor: '#e4e4e4',
            },
            title: {
                fontSize: 24,
                textAlign: "center",
                marginBottom: 20,
                fontFamily: 'Oswald'
            },
            subtitulo: {
                fontSize: 20,
                color: 'grey',
                marginBottom: 10,
                fontFamily: 'Oswald'
            },
            parrafo: {
                fontSize: 14,
                padding: 10
            }
        });

        Font.register({
            family: 'Oswald',
            src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
        });

        return (
            <div>
                <Link to='/' className="ui labeled icon button">
                    <i className="home icon"></i>
                    Volver a los chistes
                </Link>
                <PDFViewer className='render-pdf'>
                    <Document>
                        <Page style={styles.page}>
                            <View style={styles.title}>
                                <Text>Chistes Favoritos</Text>
                            </View>
                            {
                                this.state.favoritos.map(
                                    res =>
                                        <View key={res} style={styles.parrafo}>
                                            <View style={styles.subtitulo}>
                                                <Text >{res.categoria || 'Sin categoria'}</Text>
                                            </View>
                                            <Text>{res.value}</Text>
                                        </View>
                                )
                            }
                        </Page>
                    </Document>
                </PDFViewer>
            </div>
        )
    }
}

export default RenderPDF
