import React, { useState } from 'react' //hooks
// [ stateName, ( value ) => {stateName = value} ]

import './App.css';

import EntryCard from './Components/EntryCard'

function App() {
  /*creando estados con hooks:*/
  const [ title, setTitle ] = useState("Bienvenidos!!!")
  const [ blogEntries, setBlogEntries ] = useState([
    {
      entryTitle:"Entrada 1",
      content:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique reiciendis est iste nihil corrupti quaerat asperiores, vel impedit laborum quam nostrum ea a ad labore, laboriosam possimus illo, earum molestiae?",
      picture:"https://tse3.mm.bing.net/th?id=OIP.WMWnIBM5QZEzsWLkqZp_IgHaEK&pid=Api"
    },
    {
      entryTitle:"Entrada 2",
      content:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique reiciendis est iste nihil corrupti quaerat asperiores, vel impedit laborum quam nostrum ea a ad labore, laboriosam possimus illo, earum molestiae? corrupti quaerat asperiores, vel impedit laborum quam nostrum ea a ad labore, laboriosam possimus illo, earum molestiae?",
      picture:"https://tse2.mm.bing.net/th?id=OIP.LpdD3RcqDu2lFwB2_X--3AHaDt&pid=Api"
    },
    {
      entryTitle:"Entrada 3",
      content:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique reiciendis est iste nihil",
      picture:"https://tse1.mm.bing.net/th?id=OIP.MZ8PO_gbHzMgkNra6XQ6YwHaEK&pid=Api"
    },
    {
      entryTitle:"Entrada 4",
      content:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique reiciendis est iste nihil",
      picture:"https://tse1.mm.bing.net/th?id=OIP.MZ8PO_gbHzMgkNra6XQ6YwHaEK&pid=Api"
    }
  ])
  const [ entry, setEntry ] = useState({})

  const changeHandler = event => {
    const value = event.target.value
    const property = event.target.name
    setEntry( {...entry, [property]:value} )
  }

  const saveHandler = () => {
    setBlogEntries([...blogEntries, entry ])
  }

  return (
    <div className="App">
      <h1>{ title }</h1>
      <div className="main-wrapper">
        <div className="form-wrapper">
          <form action="">
            <div className="form-group">
              <label htmlFor="">Título</label>
              <input type="text" name="entryTitle" onChange={changeHandler}/></div>
            <div className="form-group">
              <label htmlFor="">Imagen</label>
              <input type="text" name="picture" onChange={changeHandler}/>
            </div>
            <div className="form-group">
              <label htmlFor="">Content</label>
              <input type="text" name="content" onChange={changeHandler}/>
            </div>
            <button type="button" onClick={saveHandler}>Guardar</button>
          </form>
        </div>
        <div className="entries-wrapper">
          {
            blogEntries.map( (entry, index) => <EntryCard entryData= { entry }/>)
          }
        </div>
      </div>
      
    </div>
  );
}

export default App;
