import './GamePage.css'
import Images from '../Images'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const API_KEY = process.env.REACT_APP_URL_API


export default function GamePage(){
    const [dogs, setDogs] = useState()//recebe os cachorros da API
    const [cats, setCats] = useState()//recebe os gatos da API
    const [dogsC, setDogsC] = useState(0)//contador de acertos do player para cachorro
    const [catsC, setCatsC] = useState(0)//contador de acertos do player para gatos
    const [totDog, setTotDog] = useState(0)//conta o total de cachorros em jogo
    const [totCat, setTotCat] = useState(0)//conta o total de gatos em jogo

    const [showAnimals, setAnimals] = useState([])//array que guarda os gatos e cachorros embaralhados
    const [escolheu, setEscolhido] = useState(0)//controle para ver quando escolhe
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
          const rnd1 = Math.floor(Math.random() * animals.length)
          const rnd2 = Math.floor(Math.random() * animals.length)
          shuffled[0] = animals[rnd1]
          shuffled[1] = animals[rnd2]

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
            
            navigate("/results", {state: {dogsC: dogsC + 1, catsC: catsC + 1, totCat: totCat, totDog: totDog, totalAnimals: totCat + totDog}})
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
            totDog = {totDog}
            totCat = {totCat}
            setTotDog = {(e) => setTotDog(e)}
            setTotCat = {(e) => setTotCat(e)}
            dogs={(e)=>setDogsC(e)}
            cats={(e)=>setCatsC(e)}
            />
          </section>
        </main>
    )
}
