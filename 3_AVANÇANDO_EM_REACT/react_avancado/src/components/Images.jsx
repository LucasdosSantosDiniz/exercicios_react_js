
import CidadeNoturna from '../assets/cidade_noturna.jpg';
const Images = ()=>{

    return(
        <div>
            <div>  
                {/* Imagens em public*/}
                <img src="/paisagem_natureza.jpg" alt="Paisagem" />
            </div>
            <div>
                 {/* Imagens em assets*/}
                <img src= {CidadeNoturna} alt="Cidade" />
            </div>
        </div>
    )
}

export default Images