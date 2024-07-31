"use client";

import React, { useEffect, useState } from 'react';

function ListaVozes() {
  const [vozes, setVozes] = useState<{ voice_id: string; name: string }[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    console.log('API Key:', apiKey); // Verifique se a chave da API está sendo carregada corretamente

    const options = {
      method: 'GET',
      headers: { 'xi-api-key': apiKey }
    };

    fetch('https://api.elevenlabs.io/v1/voices', options as RequestInit)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setVozes(data.voices)) // Atualiza o estado com os dados recebidos
      .catch(err => console.error(err));
  }, [apiKey]);

  return (
    <div>
      <h1>Lista de Vozes</h1>
      <ul>
        {vozes.map(voz => (
          <li key={voz.voice_id}>{voz.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaVozes;