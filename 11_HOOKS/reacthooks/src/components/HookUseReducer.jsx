import { useReducer, useState } from "react";

const HookUseReducer = () => {
  // 1 Iniciando com useReducer
  const [number, dispatch] = useReducer(() => {
    return Math.random();
  }, 0);

  // 2 Avançando no useReducer
  const initialTeams = [
    { id: 1, text: "Flamengo" },
    { id: 2, text: "Palmeiras" },
    { id: 3, text: "Atletico/MG" },
  ];

  const teamsReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return [...state, action.payload];

      case "DELETE":
        return state.filter((team) => team.id !== action.id);

      default:
        return state;
    }
  };

  const [teamText, setTeamText] = useState("");
  const [teams, dispatchTeams] = useReducer(teamsReducer, initialTeams);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatchTeams({
      type: "ADD",
      payload: {
        id: crypto.randomUUID(),
        text: teamText,
      },
    });

    setTeamText("");
  };

  const removeTeam = (id) => {
    dispatchTeams({ type: "DELETE", id });
  };

  return (
    <div>
      <h2>useReducer</h2>
      <p>Numero: {number}</p>
      <button onClick={dispatch}>Mude o numero!</button>
      <h3> Clubes Brasileiros</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTeamText(e.target.value)}
          value={teamText}
        />
        <input type="submit" value="Enviar" />
      </form>
      {teams.map((team) => (
        <li key={team.id} onDoubleClick={() => removeTeam(team.id)}>
          {team.text}
        </li>
      ))}
      <hr />
    </div>
  );
};

export default HookUseReducer;
