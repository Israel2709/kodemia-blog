import React, { useState, useEffect } from 'react'
import firebase from '../../lib/firebase'
import{
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'



const Create = () => {
    const [entryData, setEntryData] = useState({})
    const [ file, setFile ] = useState(null)
    const database = firebase.database()
    const entriesRef = database.ref('/entries')
    const storageRef = firebase.storage().ref()

    const changeHandler = event => {
        const property = event.target.name
        const value = event.target.value
        setEntryData({...entryData,[property]:value})
    }

    const fileHandler = event => {
        console.log( event.target )
        console.log( event.target.files )
        const file = event.target.files[0]
        console.log(file)
        setFile( file )
    }

    const saveEntry = () => {
        console.log( entryData )
        let uploadTask = storageRef.child(`/pictures/${file.name}`).put(file)
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
            // Handle unsuccessful uploads
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              entriesRef.push({...entryData,picture:downloadURL})
            });
          });
        //entriesRef.push(entryData)
    }

    return (
        <Col xs="12">
            <h1>Create</h1>
            <Form className="bg-dark text-white border rounded my-3 p-3">
                <FormGroup>
                    <Label>Título</Label>
                    <Input 
                        name="title" 
                        onChange={changeHandler}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Contenido</Label>
                    <Input 
                        name="content" 
                        onChange={changeHandler}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Imagen</Label>
                    <Input 
                        type="file"
                        name="picture"
                        onChange={ fileHandler } 
                    />
                </FormGroup>
                <Button type="button" color="light" className="mt-3" onClick={saveEntry}>Guardar</Button>
            </Form>
        </Col>
    )
}

export default Create