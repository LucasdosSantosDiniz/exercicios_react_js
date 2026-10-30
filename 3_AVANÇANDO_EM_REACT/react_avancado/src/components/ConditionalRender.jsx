import { useState } from 'react'

const ConditionalRender = () => {
  const [x] = useState(false)

  const[name, setName] = useState("Lucas")
  return (
    <div>
      <div>
        <h2> Isso sera exibido?</h2>
        {x && <p>Isso pode ser exibido</p>}
        {!x && <p>Isso nao pode ser exibido</p>}
      </div>
      <div>
        <h2> Operador ternario</h2>
        {name === "João" ? (
          <div>
            <p> O Nome é joão</p>
          </div>
        ) : (
          <div>
            <p> O nome nao existe</p>
          </div>
        )}
        <button onClick={() => setName("João")}>Clica Aqui</button>
      </div>
    </div>
  )
}
export default ConditionalRender