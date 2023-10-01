import { useEffect, useState } from "react"

export const Pagina = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [cpf, setCpf] = useState('');
    const [response, setResponse] = useState({});

    const manipularValor = (evento) => {
        setCpf(evento.target.value)
    } 

    const enviarCpf = async () => {
        const url = "https://sprint-api.vercel.app/api/sprint";
        const parametros = {
            cpf: cpf
        }
        const options = {
            method: 'POST',
            body: new URLSearchParams(parametros),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }

        const response = await fetch(url, options);
        const data = await response.json();

        setResponse(data);
    }
    
    useEffect(() => {
        if (cpf.length === 11) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [cpf]);

    return (
      <div>
        <p>Input de Texto</p>
        <input type="text" onChange={manipularValor}/>
        <button disabled={isDisabled} onClick={enviarCpf}>Procurar CPF</button>
        {response.cpf && 
            <div>
                <p>{response.cpf}</p>
                <p>{response.nome}</p>
                <p>{response.cep}</p>
            </div>
        }
        {response.message && 
            <div>
                <p>{response.message}</p>
            </div>
        }
      </div>
    );
}