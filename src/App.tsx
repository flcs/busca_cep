import React from 'react';
import './App.css';

import api from './services/api';

function App() {

  type ICEP = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge?: string;
    gia?: string;
    ddd?: string;
    siafi?: string;
  } ;

  const [input, setInput] = React.useState('');
  const [dados, setDados] = React.useState<ICEP>({} as ICEP);

  async function handleSearch() {
    if (input === '') {
      alert('Preencha algum CEP')
      return;
    } else {
      try {
        const response = await api.get<ICEP>(`/${input}/json/`);
        // console.log(response.data)
        setDados(response.data);
        setInput('');
      } catch {
        alert('CEP não encontrado');
        setInput('');
      }
    }
  }

  return (
    <>
    <div className="container">

      <div>
        <label className="title">CEP</label>
        <input
          type="text"
          placeholder="Digite um CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='buttonPesquisa' onClick={handleSearch}>Buscar</button>
      </div>

      {Object.keys(dados!).length > 0 && (
        <main className='main'>
          <span>{dados!.logradouro}</span><br/>
          {dados!.complemento !== '' && (
            <>
              <span>Complemento: {dados!.complemento}</span>
              <br/>
            </>
          )}
          <span>{dados!.bairro}</span><br/>
          <span>{dados!.localidade} / {dados!.uf}</span><br/>
          <span>CEP: {dados!.cep}</span>
        </main>
      )}
    </div>
    </>
  );
}



export default App;
