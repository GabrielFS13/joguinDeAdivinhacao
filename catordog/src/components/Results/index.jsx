import './Results.css';
import { Link, useLocation } from 'react-router-dom';
export default function Results(){
    console.log(useLocation())
    const {state} = useLocation()
    const {dogsC, catsC} = state
    return(
        <div className='containerResult'>
            <div className="score">
                <div className="title">
                    <h2>Parábens, você concluiu o teste! Eis o resultado: </h2>
                </div>
                <div className="results">
                    {"Aqui vai ficar a lógica com base no quanto acertou ex: BURRO DMS, ATÉ MEU CACHORRO SABE, MELHORE, NÃO GAMBARITOU POR POUCO, " +
                    "EXCELENTE VOCÊ É UM HUMANO QUE SABE DIFERENCIAR BIXINHOS :D"}
                </div>
                <div className='graphic'>
                    {"Aqui vai um gráfico daqueles redondo, mostrando a porcentagem de erro/acerto"} <br />
                    {dogsC}<br />
                    {catsC}
                </div>
                <div className="buttons">
                    <div className="button">
                        <Link to='/scoreboard'><button>ScoreBoard</button></Link>
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