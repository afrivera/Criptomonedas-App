import styled from "@emotion/styled";
import axios from "axios";
import { useState, useEffect } from "react";
import Cotizacion from "./components/Cotizacion";
import Formulario from "./components/Formulario";
import Spinner from "./components/Spinner";
import imagen from "./cryptomonedas.png";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [coin, setCoin] = useState("");
  const [cripto, setCripto] = useState("");
  const [resultadoApi, setResultadoApi] = useState({});
  const [cargando, setCargando] = useState( false);

  useEffect( ()=> {

    const cotizarCripto = async ()=> {
      if( coin === '') return;
      
      // llamar a la api para otener resultado
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ cripto }&tsyms=${ coin }`;

      const resultado = await axios.get( url );

      // mostrar el spinner
      setCargando( true );

      // ocultar spinner y mostrar el resultado
      setTimeout(() => {
        
        // cambiar el estado del spinner
        setCargando( false );

        // guardar cotizacion
        setResultadoApi( resultado.data.DISPLAY[cripto][coin] );

      }, 2000);

    }

    cotizarCripto();
  },[coin, cripto ])
    

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Formulario 
          setCoin = { setCoin }
          setCripto = { setCripto }
        />

        {
          (cargando )? <Spinner />
                   : <Cotizacion 
                        resultado = { resultadoApi }
                      />
        }
      </div>
    </Contenedor>
  );
}

export default App;
