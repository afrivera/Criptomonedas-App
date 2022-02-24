import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({ setCoin, setCripto}) => {

    const [listaCripto, setListaCripto] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'COP', nombre: 'Peso Colombiano'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]



    // usar useMoneda
    const [moneda, SelectMonedas ] =  useMoneda('Elige Tu Moneda', '', MONEDAS);
    const [ criptoMoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto );

    // Ejecutar llamado a la api
    useEffect( ()=> {
        const consultarApi = async ()=> {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

            const resultado = await axios.get( url );
            setListaCripto(resultado.data.Data);
        }

        consultarApi();
    },[])

    // cuando se hace submit
    const handleSubmit = e => {
        e.preventDefault();

        // validar si ambos campos estan llenos
        if( moneda.trim() ==='' || criptoMoneda.trim()=== ''){
            setError( true );
            return;
        }

        // pasar los datos al componente principal
        setError( false );
        setCoin( moneda );
        setCripto( criptoMoneda);
    }

    return (
        <form
            onSubmit = { handleSubmit }
        >
            {
                error && 
                <Error mensaje='Todos los campos son obligatorios' />
            }
            <SelectMonedas />
            <SelectCripto />

            <Boton
                type='submit'
                value='Calcular'
            />
        </form>
    )
}

export default Formulario;