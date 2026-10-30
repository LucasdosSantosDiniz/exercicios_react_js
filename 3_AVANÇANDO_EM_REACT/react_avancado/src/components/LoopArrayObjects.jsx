import NameDetails from "./NameDetails"

const LoopArrayObjects = () => {
    const data = [
        {id: 6, name: "Felipe", age: "25", ethny: "Africano", city: "Salvador", brazilianPerson:true},
        {id: 7, name: "Luisa", age: "26", ethny: "Europeu", city: "Porto Alegre", brazilianPerson:true},
        {id: 8, name: "Bruno", age: "25", ethny: "Indigena", city: "Bogotá", brazilianPerson: false},
        {id: 9, name: "Victor", age: "24", ethny: "Africano", city: "Rio de Janeiro", brazilianPerson: true}
    ]
  return (
    <div>
        {data.map((user) => (
            <NameDetails 
                name={user.name}
                age={user.age}
                ethny={user.ethny}
                city={user.city}
                brazilianPerson={user.brazilianPerson}
            />
        ))}
    </div>
  )
}

export default LoopArrayObjects