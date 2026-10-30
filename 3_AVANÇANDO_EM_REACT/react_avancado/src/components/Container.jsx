const Container = ({children, MyValue}) => {
  return (
    <div>
        <h2> Exemplo De Children</h2>
        {children}
        <h3> Caso eu queira passar uma props em um componente mesmo com children</h3>
        {MyValue}
    </div>
  )
}

export default Container