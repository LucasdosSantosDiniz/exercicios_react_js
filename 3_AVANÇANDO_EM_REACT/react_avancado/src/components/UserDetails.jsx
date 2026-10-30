const UserDetails = ({ name, age, job }) => {
  return (
    <div>
      <div>
        <ul>
          <li> Nome: {name}</li>
          <li> Idade: {age}</li>
          <li> Profissão: {job}</li>
        </ul>
        {age >= 18 ? (
          <h3> Essa pessoa pode tirar carteira de motorista</h3>
        ) : (
          <h3> Essa pessoa não pode tirar carteira de motorista</h3>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
