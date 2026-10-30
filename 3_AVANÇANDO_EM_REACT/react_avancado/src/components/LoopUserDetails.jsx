import UserDetails from "./UserDetails";

const LoopUserDetails = () => {
  const users = [
    { id: 1, name: "Arthur", age: 21, job: "Repositor de Vendas" },
    { id: 2, name: "Bianca", age: 18, job: "Repositor de Vendas" },
    { id: 3, name: "Daniel", age: 17, job: "Repositor de Vendas" },
    { id: 4, name: "Henrique", age: 20, job: "Repositor de Vendas" },
    { id: 5, name: "Natalia", age: 16, job: "Repositor de Vendas" },
  ];
  return (
    <div>
      {users.map((user) => (
        <UserDetails name={user.name} age={user.age} job={user.job} />
      ))}
    </div>
  );
};

export default LoopUserDetails;
