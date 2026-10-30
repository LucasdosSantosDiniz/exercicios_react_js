const TemplatesExpress = () => {
    const name = "Lucas";
    const data = {
        age: 32,
        job: 'Programador',
    };

    return(
        <div>
            <p> Meu Nome é {name}</p>
            <p>Tenho {data.age} e sou {data.job}</p>
        </div>
    );
};

export default TemplatesExpress;