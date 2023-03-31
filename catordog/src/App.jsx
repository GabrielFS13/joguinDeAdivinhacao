import { useEffect, useState } from 'react';
import Images from './components/Images';
import './App.css';
const API_KEY = process.env.REACT_APP_URL_API


function App() {
  
  const [dogs, setDogs] = useState()
  const [cats, setCats] = useState()
  const [dogCount, setDogCount] = useState(0)
  const [catCount, setCatCount] = useState(0)
    function getAnimals(){
      if(!cats && !dogs){
      fetch("https://api.api-ninjas.com/v1/cats?min_weight=1", {headers: {'X-Api-Key': API_KEY}})
      .then(res => res.json())
      .then(cats => {
          setCats(cats)
      })
      .catch(error => {
          return error
      })

      fetch("https://api.api-ninjas.com/v1/dogs?min_weight=1", {headers: {'X-Api-Key': API_KEY}})
      .then(res => res.json())
      .then(dogs => {
          setDogs(dogs) 
      })
      .catch(error => {
          return error
      })

      }
    }

    getAnimals()

    console.log(dogs)
    console.log(cats)
    
  return (
    <div className="App">
      <main>
        <section>
          <div className="container">
              {dogs && cats ? <Images cats={cats} dogs = {dogs} upCat={setCatCount} upDog={setDogCount}/> : ''}
              <h2 className='cachorro'>Cachorros {dogCount}</h2>
              <h2 className='gato'>Gatos {catCount}</h2>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
