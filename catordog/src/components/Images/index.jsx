import Draggable from "react-draggable";
import React, { useState } from "react";

let dogIncrement = 0
let catIncrement = 0

export default function Images({animais}){

  
    const [dogCount, setDogCount] = useState(0)
    const [catCount, setCatCount] = useState(0)
    const [escolha, setEscolha] = useState('')

    function checkAnimal(e){
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
            //arrastou para direita -> conta pra cachorro
            //vê se é cachorrou
            if(name === 'dogs'){
                //adiciona pra cachorro
                dogIncrement += 1
                setEscolha('dog')
                setTimeout(()=>{ setEscolha('') },400)
                setDogCount(dogIncrement)
            }
            e.target.style.cssText += 'opacity: 0'
            setTimeout(() => {e.target.remove()}, 600)
            return
        }
        if(direction < negativeWidth){
            //arrastou para esquerda -> conta pra gato
            //vê se é gato
            if(name === 'cats'){
                //adiciona pra gato
                catIncrement += 1
                setEscolha('cat')
                setTimeout(()=>{ setEscolha('') },400)
                setCatCount(catIncrement)
            }
            e.target.style.cssText += 'opacity: 0'
            setTimeout(() => {e.target.remove()}, 600)
            return 
        }
        e.target.style.cssText = 'transform: translate(0px, 0px);'
        
    }


    return(
        <div className="container">
            {animais.map((animal, i) => {
                return(
                    <Draggable 
                    key={i} 
                    bounds={{top: -100, bottom: 100}}
                    onStop={checkAnimal}
                    >
                        <img src={animal.image_link}
                        height='200'
                        draggable='false' 
                        key={i} alt={animal.name}
                        title={animal.name}
                        className='imagens'
                        />
                    </Draggable>
                )
            })}
            <h2 className={`cachorro  ${escolha === 'dog' ? 'textScale' : ''}`}>Cachorros {dogCount}</h2>
            <h2 className={`gato ${escolha === 'cat' ? 'textScale' : ''}`}>Gatos {catCount}</h2>
        </div>
    )
}