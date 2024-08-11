"use client";

import React, { useEffect, useState } from 'react';
import { Collapse, Layout, Row, Col, Spin, Typography, Input } from 'antd';
import { Voice } from '../types/voice';
import VoiceSelect from './voiceSelect';
import VoiceFilter from './VoiceFilter';
import { useVoiceFilter } from '../hooks/useVoiceFilter';
import { Footer } from 'antd/es/layout/layout';
import { GithubOutlined } from '@ant-design/icons';


const { Content } = Layout;
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
  const { filters, selectedFilters, handleFilterChange, filteredVozes } = useVoiceFilter(vozes);

  useEffect(() => {
    fetchVoices(setVozes, setLoadingVoiceSelect);
  }, []);

  const items = [
    {
      key: '1',
      label: 'Filtrar vozes',
      children: (
        <VoiceFilter
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      ),
      style: { backgroundColor: '#b1d4ff', borderRadius: 5 }
    }
  ];

  return (
    <Layout>
      <div>
        <Title style={{ color: 'black', fontSize: '39px', textAlign: 'center', padding: '1px' }}>
          Texto em Voz
        </Title>
        <Title style={{ color: 'black', fontSize: '20px', textAlign: 'center' }}>
          App Masters
        </Title>
      </div>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: '20vh' }}>
          <Col className='container' span={12}>
            <TextArea
              value={texto}
              style={{ marginTop: '14px', fontSize: '22px' }}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite o texto aqui e depois selecione uma voz"
              rows={3}
            />

            <Collapse style={{ marginTop: 10, fontSize: '21px' }} items={items} />

            {loadingVoiceSelect ? (
              <Spin />
            ) : (
              <VoiceSelect
                vozes={filteredVozes}
                selectedVoice={selectedVoice}
                onChange={(voice: Voice) => setSelectedVoice(vozes.find((voice) => voice.voice_id === voice.voice_id) || null)}
                texto={texto}
                handlePlay={handlePlay}
                handleDownload={handleDownload}
                setVoiceLoadingState={setVoiceLoadingState}
                voiceLoadingState={voiceLoadingState}
                setSelectedVoice={setSelectedVoice}
              />
            )}
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center', color: 'black' }}>
        <a style={{ marginLeft: '10px' }} href="https://github.com/geraldohomero/app-masters-elevenlabs-project" target="_blank" rel="noopener noreferrer">
          <GithubOutlined style={{ fontSize: '14px', color: 'black' }} /> GitHub
        </a>
      </Footer>
    </Layout>

  );
};

export default ListaVozes;