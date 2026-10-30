const Events = () => {
 
    const handleMyEvent = (e)=>{
        console.log(e);
        let total = 0;
        total++;
        console.log(total);
    };

    const renderSomenthing = (x) => {
        if (x) {
            return <h1> Posso renderizar isso !</h1>
        } else {
            return <h2> Posso renderizar isso tambem !</h2>
        }
    }

    return(
        <div>
            <p> <button onClick={handleMyEvent} >Clique Aqui</button></p>
            {renderSomenthing(true)}
            {renderSomenthing(false)}
        </div>
        
    );
}

export default Events;