import React, { Component } from 'react'
import Axios from 'axios';
import { DATA_API_URL } from './config';
import { PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
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
                flexDirection: 'column',
                backgroundColor: '#e4e4e4',
                size: 'A4'
            },
            section: {
                margin: 10,
                padding: 10,
            }
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
                            {
                                this.state.favoritos.map(
                                    res =>
                                        <View key={res} style={styles.section}>
                                            <Text style={{ fontSize: 24 }}>
                                                {res.categoria || 'Sin categoria'}
                                            </Text>
                                            <Text>
                                                {res.value}
                                            </Text>
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
