const Chanllege = () => {
    let number = 3;
    let number2 = 4;

    const handleSum = (total) => {
        total = number + number2;
        return console.log(total)
    }
    return(
        <div>
            <p> {number} && {number2}</p>
            <button onClick={handleSum}> Clique Aqui </button>

        </div>
    )
}

export default Chanllege;