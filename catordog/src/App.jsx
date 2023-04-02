import { useState } from 'react';
import Images from './components/Images';
import './App.css';
const API_KEY = process.env.REACT_APP_URL_API


function App() {
  
  const [dogs, setDogs] = useState(false)
  const [cats, setCats] = useState(false)


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
      function shuffleAnimals(){
        const animals = cats.concat(dogs)
        const shuffled = animals.sort(() => Math.random() - 0.5);

        return shuffled

      }
  return (
    <div className="App">
      <main>
        <section>
            {dogs && cats ?
             <Images animais={shuffleAnimals()} /> : ''}
        </section>
      </main>
    </div>
  );
}

export default App;
