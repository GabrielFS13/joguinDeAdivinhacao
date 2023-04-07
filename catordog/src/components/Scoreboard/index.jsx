import { useState } from 'react'
import './Scoreboard.css'
import { Link } from 'react-router-dom'
import { TbH2 } from 'react-icons/tb'

export default function Scoreboard(){
    const [results, setResults] = useState(JSON.parse(localStorage.getItem("results")) || [])
    const limpa = () =>{
        setResults([])
        localStorage.clear()
    }
    return(
        <div className="scoreboard">
            <h1>Scoreboard</h1>
            {results.length > 0 ? results.map((score, i) =>{
                return(
                    <div key={i} className='result_register'>
                        <ul>
                            <li>Erros: {score.erros}</li>
                            <li>Acertos: {score.marcados}</li>
                            <li>Total de animais: {score.totalAnimals}</li>
                        </ul>
                    </div>
                )
            }) :
            <h2>Você ainda não jogou.</h2>}
            <div className="buttons">
                    <div className="button">
                        <Link to='/'><button>Voltar ao início</button></Link>
                    </div>
                    <div className="button">
                        <Link to='/game'><button>Jogar</button></Link>
                    </div>
                    <div className="button">
                        <a><button onClick={limpa}>Limpar Scoreboard</button></a>
                    </div>
            </div>
        </div>

    )
}