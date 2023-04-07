import './Results.css';
import { Link, json, useLocation } from 'react-router-dom';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Results(){
    const {state} = useLocation()
    const {dogsC, catsC, totCat, totDog, totalAnimals} = state
    const erros = (totDog - dogsC ) + (totCat - catsC )
    const results = {
        erros,
        totalAnimals,
        marcados: dogsC + catsC
    }
    
    useEffect(()=>{
        const odResults = JSON.parse(localStorage.getItem("results")) || []
        odResults.push(results)
        localStorage.setItem("results", JSON.stringify(odResults))
    }, [])

    const dataPie = {
        labels: ["Acertos", "Erros"],
        datasets:[
            {
                label: "Total ",
                data: [dogsC+catsC,erros],
                backgroundColor: [
                    'rgba(26, 47, 236, 0.4)',
                    'rgba(241, 31, 31, 0.4)',
                ],
                borderColor: [
                    'rgba(26, 47, 236, 1)',
                    'rgba(241, 31, 31, 1)',
                ],
                borderWidth: 1
            }
        ]
    }
    const dataDough = {
        labels: ["Total de gatos e cachorros", "Marcados", "Errados"],
        datasets:[
            {
                label: "Total ",
                data: [totalAnimals, dogsC + catsC, erros],
                backgroundColor: [
                    'rgba(0, 255, 0, 0.4)',
                    'rgba(0, 0, 255, 0.4)',
                    'rgba(255, 0, 0, 0.4)',
                ],
                borderColor: [
                    'rgba(0, 255, 0, 0.4)',
                    'rgba(0, 0, 255, 0.4)',
                    'rgba(255, 0, 0, 0.4)',
                ],
                borderWidth: 1
            }
        ]
    }

    return(
        <div className='containerResult'>
            <div className="score">
                <div className="title">
                    <h2>Parábens, você concluiu o teste! Eis o resultado: </h2>
                </div>
                <div className="results">
                   <p>
                    Em relaçao a <strong>cachorros</strong>: {dogsC >= totDog - 1 ? "Parabéns você sabe dizer o que é um cachorro." : 
                    dogsC > (totDog - 1)/2 ? "Bom... você acertou pelo menos a metade. Mas melhore." : dogsC < (totDog - 1) /2 && dogsC !== 1? "Nem a metade? Você tá MESMO tentando???" : 
                    totDog === 1 ? "Bom, não teve nenhum cachorro no quiz, então fica por isso mesmo" :"Meu amigo... você claramenta não sabe o que é um cachorro."}
                   </p>
                   <p>
                    Em relação a <strong>gatos</strong>: {catsC >= totCat - 1 ? "Parabéns você sabe dizer o que é um gato." : 
                    catsC > (totCat - 1)/2 ? "Bom... você acertou pelo menos a metade. Mas melhore." : catsC < (totCat-1) /2  && catsC !== 1? "Nem a metade? Você tá MESMO tentando???" : 
                    totCat === 1 ? "Bom, não teve nenhum gato no quiz, então fica por isso mesmo" :"Meu amigo... você claramenta não sabe o que é um gato."}
                   </p>
                </div>
                <div className='chart'>
                    <div className="chartTitle">
                        <h2>Desempenho</h2>
                    </div>
                    <div className="pie">
                        <Pie data={dataPie} />
                    </div>
                    <div className="doug">
                        <Doughnut data={dataDough} />
                    </div>
                </div>
                <div className="buttons">
                    <div className="button">
                        <Link to='/scoreboard'><button>Scoreboard</button></Link>
                    </div>
                    <div className="button">
                        <Link to='/game'><button>Jogar novamente</button></Link>
                    </div>
                    <div className="button">
                        <Link to='/'><button>Voltar ao início</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}