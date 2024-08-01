"use client";

import React, { useEffect, useState } from 'react';
import {
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TextareaAutosize,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  MenuItem,
  Select
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const labelTranslations: { [key: string]: string } = {
  use_case: "Caso de Uso",
  age: "Idade",
  gender: "Gênero",
  description: "Descrição",
  accent: "Sotaque"
};

function ListaVozes() {
  const [vozes, setVozes] = useState<{ voice_id: string; name: string; category: string; labels: { [key: string]: string }; description: string }[]>([]);
  const [texto, setTexto] = useState<string>('');
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<{ voice_id: string; name: string; category: string; labels: { [key: string]: string }; description: string } | null>(null);


  useEffect(() => {
    fetch('/api/voices')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setVozes(data.voices)) // Atualiza o estado com os dados recebidos
      .catch(err => console.error(err));
  }, []);

  const handlePlay = async (voiceId: string) => {
    setLoadingVoiceId(voiceId);
    try {
      const response = await fetch("/api/get-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voiceId, text: texto }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const audio = new Audio(`/audio/${data.fileName}`);
      audio.play();
    } catch (error) {
      console.error("Erro ao obter o áudio:", error);
    } finally {
      setLoadingVoiceId(null);
    }
  };

  const handleDownload = async (voiceId: string) => {
    setLoadingVoiceId(voiceId);
    try {
      const response = await fetch("/api/get-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voiceId, text: texto }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const link = document.createElement('a');
      link.href = `/audio/${data.fileName}`;
      link.download = `${data.fileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar o áudio:", error);
    } finally {
      setLoadingVoiceId(null);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '20vh', paddingTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <TextareaAutosize
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite o texto aqui"
              style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
              minRows={5}
              {...((props: any) => {
                const { 'data-sharkid': _, ...restProps } = props;
                return restProps;
              })}
            />
            <Select
              value={selectedVoice ? selectedVoice.voice_id : ''}
              onChange={(e) => {
                const selected = vozes.find(voice => voice.voice_id === e.target.value);
                setSelectedVoice(selected || null);
              }}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">
                <em>Selecione uma voz</em>
              </MenuItem>
              {vozes.map(voice => (
                <MenuItem key={voice.voice_id} value={voice.voice_id}>
                  {voice.name} - {voice.labels.description}
                </MenuItem>
              ))}
            </Select>

            {selectedVoice && (
              <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12}>
                  <Card style={{ height: '100%', padding: '10px' }}>
                    <CardContent style={{ padding: '10px' }}>
                      <Typography variant="h6" component="div">
                        {selectedVoice.name}
                      </Typography>
                      <div>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Labels:</strong>
                        </Typography>
                        <TableContainer component={Paper}>
                          <Table size="small">
                            <TableBody>
                              {selectedVoice.labels ? (
                                Object.entries(selectedVoice.labels)
                                  .sort(([keyA], [keyB]) => (labelTranslations[keyA] || keyA).localeCompare(labelTranslations[keyB] || keyB))
                                  .map(([key, value]) => (
                                    <TableRow key={key}>
                                      <TableCell component="th" scope="row">
                                        {labelTranslations[key] || key}
                                      </TableCell>
                                      <TableCell>{value}</TableCell>
                                    </TableRow>
                                  ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={2}>N/A</TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                      {texto && (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handlePlay(selectedVoice.voice_id)}
                            disabled={loadingVoiceId === selectedVoice.voice_id}
                            style={{ marginTop: '10px' }}
                          >
                            Play
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDownload(selectedVoice.voice_id)}
                            disabled={loadingVoiceId === selectedVoice.voice_id}
                            style={{ marginTop: '10px', marginLeft: '10px' }}
                          >
                            Download
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default ListaVozes;