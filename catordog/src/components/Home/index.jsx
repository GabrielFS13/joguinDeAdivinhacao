import './Home.css';
import { Link } from 'react-router-dom';
export default function Home(){
    return(
        <div className="content">
            <div className="text">
                <p>
                    Seu objetivo aqui é simples, haverá uma imagem na tela a imagem de um animal,
                    você deve distinguir se é um gato ou um cachorro, caso seja um cachorro, arraste para direita,
                    caso seja um gato arraste para esquerda.
                    Serão ao todo 30 imagens, no final, se apresentado um relatório dizendo o quão bom você é em diferenciar esses animais.
                    Boa sorte!
                </p>
            </div>
            <div className="buttons">
                <div className="button">
                    <Link to="/game"><button>Começar</button></Link>
                </div>
            </div>
        </div>
    )
}