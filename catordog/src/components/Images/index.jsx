import Draggable from "react-draggable";
import React from "react";

let dogCount = 0
let catCount = 0

export default function Images({cats, dogs, upCat, upDog, setEscolha}){

    const animals = cats?.concat(dogs)
    const shuffledAnimals = animals?.sort((a, b) => 0.5 - Math.random());

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

        console.log(direction)
        console.log(containerWidht)
        console.log(negativeWidth)

        if(direction > containerWidht ){
            //arrastou para direita -> conta pra cachorro
            //vê se é cachorrou
            if(name === 'dogs'){
                //adiciona pra cachorro
                dogCount += 1
                setEscolha('dog')
                setTimeout(()=>{ setEscolha('') },400)
                upDog(dogCount)
                e.target.style.opacity = '0'
            }
            setTimeout(() => {e.target.remove()}, 1000)
            //e.target.remove()
            return 
        }
        if(direction < negativeWidth){
            //arrastou para esquerda -> conta pra gato
            //vê se é gato
            if(name === 'cats'){
                //adiciona pra gato
                catCount += 1
                setEscolha('cat')
                setTimeout(()=>{ setEscolha('') },400)
                upCat(catCount)
                e.target.style.opacity = '0'
            }
            setTimeout(() => {e.target.remove()}, 1000)
            //e.target.remove()
            return 
        }
        e.target.style.cssText = 'transform: translate(0px, 0px);'
        
    }


    return(
        shuffledAnimals?.map((animal, i) => {
            return(
                <Draggable 
                className='img' 
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
        })
    )
}