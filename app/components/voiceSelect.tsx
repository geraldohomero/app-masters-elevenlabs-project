import React, { useState } from 'react';
import { List, Card, Row, Col, Typography, Badge, Space, Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Voice } from '../types/voice';

interface VoiceSelectProps {
  vozes: Voice[];
  selectedVoice: Voice | null;
  onChange: (voice: Voice) => void;
  texto: string;
  handlePlay: (voiceId: string, texto: string, setVoiceLoadingState: React.Dispatch<React.SetStateAction<string | null>>) => Promise<void>;
  handleDownload: (voiceId: string, texto: string, setVoiceLoadingState: React.Dispatch<React.SetStateAction<string | null>>) => Promise<void>;
  setVoiceLoadingState: React.Dispatch<React.SetStateAction<string | null>>;
  voiceLoadingState: string | null;
  setSelectedVoice: (voice: Voice | null) => void;
}

const VoiceSelect: React.FC<VoiceSelectProps> = ({ vozes, selectedVoice, onChange, texto, handlePlay, handleDownload, setVoiceLoadingState, voiceLoadingState, setSelectedVoice }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const sortedVozes = [...vozes].sort((a, b) => a.name.localeCompare(b.name));

  const handlePlayPause = (voice: Voice) => {
    if (isPlaying === voice.voice_id) {
      if (audio) {
        audio.pause();
        setIsPlaying(null);
      }
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(voice.preview_url);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(voice.voice_id);
    }
  };

  const handleCardClick = (voiceId: string) => {
    if (selectedVoice?.voice_id === voiceId) {
      setSelectedVoice(null);
    } else {
      setSelectedVoice(vozes.find((voice) => voice.voice_id === voiceId) || null);
    }
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <List
        dataSource={sortedVozes}
        renderItem={voice => (
          <List.Item>
            <Card
              hoverable
              onClick={() => handleCardClick(voice.voice_id)}
              style={{
                borderColor: selectedVoice?.voice_id === voice.voice_id ? '#1890ff' : '#f0f0f0',
                borderWidth: '2px',
                width: '100%',
              }}
            >
              <div>
                <Card.Meta
                  title={
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Typography.Text style={{ fontSize: '22px' }}>
                        {voice.name} |
                      </Typography.Text>
                      <Typography.Text style={{ fontSize: '10px', marginLeft: '5px' }}>
                        {voice.category}
                      </Typography.Text>
                    </div>
                  }
                />
                <div className="voice-card-buttons" style={{ display: 'flex', alignItems: 'center' }}>
                  {selectedVoice?.voice_id === voice.voice_id && texto && (
                    <>
                      {voiceLoadingState === `play-${voice.voice_id}` ? (
                        <LoadingOutlined style={{ marginRight: '10px' }} />
                      ) : (
                        <Button
                          type="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlay(voice.voice_id, texto, setVoiceLoadingState);
                          }}
                          style={{ marginRight: '1px', fontSize: '15px' }}
                        >
                          Play
                        </Button>
                      )}
                      {voiceLoadingState === `download-${voice.voice_id}` ? (
                        <LoadingOutlined style={{ marginRight: '10px' }} />
                      ) : (
                        <Button
                          type="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(voice.voice_id, texto, setVoiceLoadingState);
                          }}
                          style={{ marginRight: '1px', fontSize: '15px' }}
                        >
                          Download
                        </Button>
                      )}
                    </>
                  )}
                  <Button
                    type="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause(voice);
                    }}
                    style={{ display: 'flex', alignItems: 'center', fontSize: '15px' }}
                  >
                    {isPlaying === voice.voice_id ? (
                      <PauseCircleOutlined />
                    ) : (
                      <PlayCircleOutlined />
                    )}
                    <Typography.Text style={{ marginLeft: '5px', fontSize: '15px' }}>Preview</Typography.Text>
                  </Button>
                </div>
              </div>
              <Space direction="horizontal" style={{ marginTop: '10px' }} wrap>
                <Badge count={voice.description} style={{ backgroundColor: '#137cfa', fontSize: '15px' }} />
                {voice.labels && Object.entries(voice.labels).map(([label, value]) => (
                  <Badge key={label} count={value} style={{ backgroundColor: '#137cfa', fontSize: '15px' }} />
                ))}
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default VoiceSelect;