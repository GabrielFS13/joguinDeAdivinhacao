import './Results.css';
import { Link, useLocation } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Results(){
    const {state} = useLocation()
    const {dogsC, catsC, totCat, totDog, totalAnimals} = state

    const data = {
        labels: ["Cachorros","Gatos","Total de cachorros e gatos"],
        datasets:[
            {
                label: "Total ",
                data: [dogsC, catsC, totalAnimals],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
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
                    <h2>Desempenho</h2>
                    <Doughnut data={data} />
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