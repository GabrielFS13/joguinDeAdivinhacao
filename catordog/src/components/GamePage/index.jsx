import './GamePage.css'
import Images from '../Images'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const API_KEY = process.env.REACT_APP_URL_API


export default function GamePage(){
    const [dogs, setDogs] = useState()
    const [cats, setCats] = useState()
    const [dogsC, setDogsC] = useState(0)
    const [catsC, setCatsC] = useState(0)

    const [showAnimals, setAnimals] = useState([])
    const [escolheu, setEscolhido] = useState(0)
    const navigate = useNavigate()

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
        
        const shuffleAnimals = (forma) => {
          const animals = dogs.concat(cats)
          const shuffled = []
          shuffled[0] = animals[Math.floor(Math.random() * animals.length)]
          shuffled[1] = animals[Math.floor(Math.random() * animals.length)]
          //shuffled[2] = animals[Math.floor(Math.random() * animals.length)]
  
          if(forma !== 'spread'){
              return shuffled[0]
          }else{
              return shuffled
          }
      }
          
  
        useEffect(()=>{
          if(dogs && cats){
              setAnimals([...showAnimals, ...shuffleAnimals('spread')])
              //console.log("primeiro foi")
          }
        },[dogs, cats])
  
        
        useEffect(() =>{
          if(showAnimals.length > 30){
            navigate("/results", {state: {dogsC, catsC}})
            
          }
          if(dogs && cats){
              setAnimals([...showAnimals, shuffleAnimals()])
              //console.log("Atualizou estado")
              //console.log(showAnimals)
          }
        }, [escolheu])
  
    return(
        <main>
          <section>
            <Images
            showAnimals={showAnimals} 
            setEscolhido={(e) => setEscolhido(e)} 
            escolheu={escolheu}
            dogs={(e)=>setDogsC(e)}
            cats={(e)=>setCatsC(e)}
            /> 
          </section>
        </main>
    )
}
