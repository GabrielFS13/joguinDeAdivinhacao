import Draggable from "react-draggable";
import React, { useState, useEffect } from "react";
const API_KEY = process.env.REACT_APP_URL_API

let dogIncrement = 0
let catIncrement = 0
export default function Images(){
  
    const [dogCount, setDogCount] = useState(0)
    const [catCount, setCatCount] = useState(0)
    const [escolha, setEscolha] = useState('')
     
    const [dogs, setDogs] = useState()
    const [cats, setCats] = useState()
    const [showAnimals, setAnimals] = useState([])
    const [escolheu, setEscolhido] = useState(0)

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
        if(dogs && cats){
            setAnimals([...showAnimals, shuffleAnimals()])
            //console.log("Atualizou estado")
            //console.log(showAnimals)
        }
      }, [escolheu])

    function checkAnimal(e){
        try{
            var pos = e.target.style.cssText
            pos = pos.split('(')
            var direction = pos[1].split('px')
            direction = direction[0]
            const containerWidht = document.querySelector("section").clientWidth / 3
            const negativeWidth = (containerWidht) * -1

            var name = e.target.src
            name = name.split('/')
            name = name[4]

            if(direction > containerWidht ){
                setEscolhido(escolheu + 1)
                //arrastou para direita -> conta pra cachorro
                //vê se é cachorrou
                if(name === 'dogs'){
                    //adiciona pra cachorro
                    dogIncrement += 1
                    setEscolha('dog')
                    setTimeout(()=>{ setEscolha('') },400)
                    setDogCount(dogIncrement)
                }
                e.target.style.cssText += 'opacity: 0; z-index: 2;'
                setTimeout(() => {e.target.remove()}, 600)
                return
            }
            if(direction < negativeWidth){
                setEscolhido(escolheu + 1)
                //arrastou para esquerda -> conta pra gato
                //vê se é gato
                if(name === 'cats'){
                    //adiciona pra gato
                    catIncrement += 1
                    setEscolha('cat')
                    setTimeout(()=>{ setEscolha('') },400)
                    setCatCount(catIncrement)
                }
                e.target.style.cssText += 'opacity: 0; z-index: 2;'
                setTimeout(() => {e.target.remove()}, 600)
                return 
            }
        }catch{
            e.target.style.cssText = 'transform: translate(0px, 0px);'
        }
        e.target.style.cssText = 'transform: translate(0px, 0px);'
        
    }
    return(
        <div className="container">
            {showAnimals.map((animal, i) => {
                return(
                    <Draggable 
                    key={i} 
                    bounds={{top: -100, bottom: 100}}
                    onStop={checkAnimal}
                    >
                        <img src={animal.image_link}
                        draggable='false' 
                        key={i} alt={animal.name}
                        title={animal.name}
                        desc={i}
                        className={`imagens ${i == showAnimals.length-2 ? 'first' : ''}`}
                        />
                        
                    </Draggable>
                )
            })}
            <h2 className={`cachorro  ${escolha === 'dog' ? 'textScale' : ''}`}>Cachorros {dogCount}</h2>
            <h2 className={`gato ${escolha === 'cat' ? 'textScale' : ''}`}>Gatos {catCount}</h2>
        </div>
    )
}