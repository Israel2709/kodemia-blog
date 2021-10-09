import React, { useState, useEffect } from 'react' //hooks
// [ stateName, ( value ) => {stateName = value} ]

import routes from './config/routes'

import firebase from './lib/firebase'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
} from 'reactstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import EntryCard from './Components/EntryCard'
import Home from './Pages/Home';
import Create from './Pages/Create';
import Detail from './Pages/Detail';

function App() {
  /*creando estados con hooks:*/
  const [title, setTitle] = useState("Bienvenidos!!!")
  const [blogEntries, setBlogEntries] = useState([
    {
      entryTitle: "Entrada 1",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique reiciendis est iste nihil corrupti quaerat asperiores, vel impedit laborum quam nostrum ea a ad labore, laboriosam possimus illo, earum molestiae?",
      picture: "https://tse3.mm.bing.net/th?id=OIP.WMWnIBM5QZEzsWLkqZp_IgHaEK&pid=Api"
    },
    {
      entryTitle: "Entrada 2",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique reiciendis est iste nihil corrupti quaerat asperiores, vel impedit laborum quam nostrum ea a ad labore, laboriosam possimus illo, earum molestiae? corrupti quaerat asperiores, vel impedit laborum quam nostrum ea a ad labore, laboriosam possimus illo, earum molestiae?",
      picture: "https://tse2.mm.bing.net/th?id=OIP.LpdD3RcqDu2lFwB2_X--3AHaDt&pid=Api"
    },
    {
      entryTitle: "Entrada 3",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique reiciendis est iste nihil",
      picture: "https://tse1.mm.bing.net/th?id=OIP.MZ8PO_gbHzMgkNra6XQ6YwHaEK&pid=Api"
    },
    {
      entryTitle: "Entrada 4",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique reiciendis est iste nihil",
      picture: "https://tse1.mm.bing.net/th?id=OIP.MZ8PO_gbHzMgkNra6XQ6YwHaEK&pid=Api"
    }
  ])
  const [entry, setEntry] = useState({})
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const changeHandler = event => {
    const value = event.target.value
    const property = event.target.name
    setEntry({ ...entry, [property]: value })
  }

  const saveHandler = () => {
    setBlogEntries([...blogEntries, entry])
  }

  /*useEffect( () => {
    console.log(" componente cargado")
    const database = firebase.database()
    const entriesRef = database.ref('/entries')
    entriesRef.on('value', snapshot => {
      console.log( snapshot )
      console.log( snapshot.val())
    })
  },[])*/

  return (
    <div className="App">
      <Router>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Kodeblog</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {
                routes.routes.map(route => {
                  const { label, path } = route
                  return (
                    <NavItem>
                      <Link to={path}>
                        <NavLink>{label}</NavLink>
                      </Link>
                    </NavItem>
                  )
                })
              }
            </Nav>
          </Collapse>
        </Navbar>
        <Container>
          <Row>
            <Switch>
              <Route path="/detail/:id">
                <Detail />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
