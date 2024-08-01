"use client";

import React, { useEffect, useState } from 'react';
import { CssBaseline, Container, Grid, Button, ThemeProvider } from '@mui/material';
import TextInput from './textInput';
import VoiceSelect from './voiceSelect';
import VoiceDetails from './voiceDetails';
import darkTheme from './theme';
import { Voice } from '../types/voice';

const fetchVoices = async (setVozes: React.Dispatch<React.SetStateAction<Voice[]>>) => {
  try {
    const response = await fetch('/api/voices');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setVozes(data.voices);
  } catch (err) {
    console.error(err);
  }
};

const handlePlay = async (voiceId: string, texto: string, setLoadingVoiceId: React.Dispatch<React.SetStateAction<string | null>>) => {
  setLoadingVoiceId(voiceId);
  try {
    const response = await fetch("/api/get-audio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ voiceId, text: texto })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const audio = new Audio(data.url);
    audio.play();
  } catch (error) {
    console.error("Erro ao obter o áudio:", error);
  } finally {
    setLoadingVoiceId(null);
  }
};

const handleDownload = async (voiceId: string, texto: string, setLoadingVoiceId: React.Dispatch<React.SetStateAction<string | null>>) => {
  setLoadingVoiceId(voiceId);
  try {
    const response = await fetch("/api/get-audio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ voiceId, text: texto })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const blob = await fetch(data.url).then(res => res.blob());
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'audio.mp3';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao baixar o áudio:", error);
  } finally {
    setLoadingVoiceId(null);
  }
};

const ListaVozes: React.FC = () => {
  const [vozes, setVozes] = useState<Voice[]>([]);
  const [texto, setTexto] = useState<string>('');
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);

  useEffect(() => {
    fetchVoices(setVozes);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '20vh', paddingTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <TextInput
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite o texto aqui"
            />
            <VoiceSelect
              vozes={vozes}
              selectedVoice={selectedVoice}
              onChange={(voiceId) => {
                const selected = vozes.find(voice => voice.voice_id === voiceId);
                setSelectedVoice(selected || null);
              }}
            />
            {selectedVoice && (
              <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12}>
                  <VoiceDetails selectedVoice={selectedVoice} />
                </Grid>
                {texto && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePlay(selectedVoice.voice_id, texto, setLoadingVoiceId)}
                      disabled={loadingVoiceId === selectedVoice.voice_id}
                      style={{ marginTop: '10px', marginLeft: '18px' }}
                    >
                      Play
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDownload(selectedVoice.voice_id, texto, setLoadingVoiceId)}
                      disabled={loadingVoiceId === selectedVoice.voice_id}
                      style={{ marginTop: '10px', marginLeft: '10px' }}
                    >
                      Download
                    </Button>
                  </>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ListaVozes;