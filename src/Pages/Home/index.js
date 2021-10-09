import React, { useState, useEffect } from 'react'
import EntryCard from '../../Components/EntryCard'
import {
    Link
} from 'react-router-dom'
import firebase from '../../lib/firebase'
import {
    Row,
    Col,
    Card,
    CardTitle,
    CardImg,
    CardBody,
    CardText,
    Button
} from 'reactstrap'
const Home = () => {
    const [entriesList, setEntriesList] = useState({})

    const database = firebase.database()
    const entriesRef = database.ref('/entries')
    useEffect(() => {
        entriesRef.on('value', snapshot => {
            console.log(snapshot.val())
            setEntriesList(snapshot.val())
        })
    }, [])
    return (
        <>
            <Col xs="12">
                <h1>Home</h1>
                <Row>
                    {
                        Object.keys(entriesList).map(key => {
                            const entryData = entriesList[key]
                            const { title, picture, content } = entryData
                            return (
                                <Col xs="12" md="3" key={key}>
                                    <Card>
                                        <CardImg top width="100%" src={picture} alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle tag="h5">{title}</CardTitle>
                                            <CardText>{content}</CardText>
                                            <Link to={`/detail/${key}`}>
                                                <Button>Ver detalle</Button>
                                            </Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Col>
        </>
    )
}

export default Home