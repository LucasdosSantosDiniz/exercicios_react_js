import style from "./ListCar.module.css"
const ListCar = ({ car, age, engine, km, price }) => {
  return (
    <div className={style.div_listcar}>
      <p>CARRO : {car}</p>
      <p>ANO: {age}</p>
      <p>MOTOR: {engine}</p>
      <p>KM: {km}</p>
      <p>R$: {price}</p>
    </div>
  );
};

export default ListCar;
