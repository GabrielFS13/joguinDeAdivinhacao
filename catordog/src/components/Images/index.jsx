import Draggable from "react-draggable";
import React, { useState } from "react";
import { TbCat, TbDog } from 'react-icons/tb'


export default function Images({showAnimals, setEscolhido, escolheu, dogs, cats}){
  
    const [dogCount, setDogCount] = useState(0)
    const [catCount, setCatCount] = useState(0)
    const [escolha, setEscolha] = useState('')
    
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
                    setEscolha('dog')
                    setTimeout(()=>{ setEscolha('') },400)
                    setDogCount(dogCount + 1)
                    dogs(dogCount)
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
                    setEscolha('cat')
                    setTimeout(()=>{ setEscolha('') },400)
                    setCatCount(catCount + 1)
                    cats(catCount)
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
            <div className="gameScoreboard">
                <h2 className={`cachorro  ${escolha === 'dog' ? 'textScale' : ''}`}><TbDog size={30} color='white'/> {dogCount}</h2>
                <h2 className={`gato ${escolha === 'cat' ? 'textScale' : ''}`}><TbCat size={30} color='white'/>  {catCount}</h2>
            </div>
            <div className="gameImages">
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
            </div>
        </div>
    )
}