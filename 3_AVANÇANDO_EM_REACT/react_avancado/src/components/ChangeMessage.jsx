const ChangeMessage = ({ handleMessage }) => {
  const message = [
    "O Matheus é namorado da Isabela !",
    "A Luisa gosta do Victor !",
    "O Pedro é amigo do Gabriel !",
  ];
  return (
    <div>
      <button onClick={() => handleMessage(message[0])}>1</button>
      <button onClick={() => handleMessage(message[1])}>2</button>
      <button onClick={() => handleMessage(message[2])}>3</button>
    </div>
  );
};

export default ChangeMessage;
