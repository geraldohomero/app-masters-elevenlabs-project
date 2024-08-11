"use client";

import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Spin, Input, Typography } from 'antd';
import { Voice } from '../types/voice';
import VoiceSelect from './voiceSelect';

const { Header, Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

const fetchVoices = async (setVozes: React.Dispatch<React.SetStateAction<Voice[]>>, setLoadingVoiceSelect: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoadingVoiceSelect(true);
  try {
    const response = await fetch('/api/voices');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setVozes(data.voices);
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingVoiceSelect(false);
  }
};

const handlePlay = async (voiceId: string, texto: string, setVoiceLoadingState: React.Dispatch<React.SetStateAction<string | null>>) => {
  setVoiceLoadingState(`play-${voiceId}`);
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
    setVoiceLoadingState(null);
  }
};

const handleDownload = async (voiceId: string, texto: string, setVoiceLoadingState: React.Dispatch<React.SetStateAction<string | null>>) => {
  setVoiceLoadingState(`download-${voiceId}`);
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
    setVoiceLoadingState(null);
  }
};

const ListaVozes: React.FC = () => {
  const [vozes, setVozes] = useState<Voice[]>([]);
  const [texto, setTexto] = useState<string>('');
  const [loadingVoiceSelect, setLoadingVoiceSelect] = useState<boolean>(false);
  const [voiceLoadingState, setVoiceLoadingState] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);

  useEffect(() => {
    fetchVoices(setVozes, setLoadingVoiceSelect);
  }, []);

  return (
    <Layout>
      <Header style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Title style={{ color: 'white' }}>App Masters</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row justify="center" align="middle" style={{ minHeight: '20vh' }}>
          <Col span={12}>
            <TextArea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite o texto aqui e depois selecione uma voz"
              rows={3}
            />
            {loadingVoiceSelect ? (
              <Spin />
            ) : (
              <VoiceSelect
                vozes={vozes}
                selectedVoice={selectedVoice}
                onChange={(voiceId) => {
                  const voice = vozes.find(v => v.voice_id === voiceId) || null;
                  setSelectedVoice(voice);
                }}
                texto={texto}
                handlePlay={handlePlay}
                handleDownload={handleDownload}
                setVoiceLoadingState={setVoiceLoadingState}
                voiceLoadingState={voiceLoadingState}
              />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ListaVozes;