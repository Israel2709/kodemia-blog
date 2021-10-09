import React, { useEffect,useState } from 'react'
import firebase from '../../lib/firebase'

import {
    useParams
} from "react-router-dom";

import{
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap'

const Detail = () => {
    const [entryData, setEntryData ] = useState({})
    const { id } = useParams()
    const database = firebase.database()
    useEffect( () => {
        database.ref(`/entries/${id}`).on('value', snapshot => {
            console.log( snapshot.val() )
            setEntryData( snapshot.val() )
        })
    },[])
    const { title, picture, content } = entryData
    return (
        <Col xs="12">
            <Card>
                <CardImg top width="100%" src={picture} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">{title}</CardTitle>
                    <CardText>{content}</CardText>
                </CardBody>
            </Card>
        </Col>
    )
}

export default Detail