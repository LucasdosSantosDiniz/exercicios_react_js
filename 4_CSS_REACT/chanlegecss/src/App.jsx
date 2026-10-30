import "./App.css";
import ListCar from "./components/ListCar";

function App() {
  const cars = [
    {
      id: 1,
      name: "Chevrolet Onix",
      age: "2020",
      engine: "1.0 Turbo 116 cv",
      km: "até 17 km/l",
      price: "65 mil",
    },
    {
      id: 2,
      name: "Fiat Mobi",
      age: "2018",
      engine: "1.0 Fire 75 cv",
      km: "até 13 km/l",
      price: "40 mil",
    },
    {
      id: 3,
      name: "Hyundai HB20",
      age: "2021",
      engine: "1.0 Turbo",
      km: "até 15 km/l",
      price: "75 mil",
    },
    {
      id: 4,
      name: "Volkswagen Polo",
      age: "2019",
      engine: "1.0 MPI ou Turbo",
      km: "até 16 km/l",
      price: "69 mil",
    },
    {
      id: 5,
      name: "Toyota Corolla",
      age: "2017",
      engine: "2.0 Flex",
      km: "até 12 km/l",
      price: "95 mil",
    },
    {
      id: 6,
      name: "Honda Civic",
      age: "2016",
      engine: "2.0 Flex",
      km: "até 13 km/l",
      price: "90 mil",
    },
  ];
  return (
    <div>
      <h1> FEIRAO DE CARROS DO BRASIL </h1>
      <div className="div_container">
        <h2> OFERTAS  </h2>
        <div className="div_carros">
          {cars.map((data) => (
            <ListCar
              key={data.id}
              car={data.name}
              age={data.age}
              engine={data.engine}
              km={data.km}
              price={data.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
