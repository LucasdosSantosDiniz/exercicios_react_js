const NameDetails = ({name, age,ethny,city,brazilianPerson}) => {
  return (
    <div>
        <h2>Props</h2>
        <div>
            <h3> Dados da pessoa</h3>
            <ul>
                <li> Nome: {name} </li>
                <li> Idade: {age} </li>
                <li> Etnia: {ethny}</li>
                <li> Cidade: {city}</li>
            </ul>
            {brazilianPerson ? (
                <p> Essa pessoa é brasileira</p>
            ) :(
                <p> Essa pessoa não é brasileira</p>
            )}
        </div>
    </div>
  )
}

export default NameDetails
