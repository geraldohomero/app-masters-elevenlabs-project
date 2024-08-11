import React, { useState } from 'react';
import { List, Card, Typography, Badge, Space, Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Voice } from '../types/voice';

interface VoiceSelectProps {
  vozes: Voice[];
  selectedVoice: Voice | null;
  onChange: (voiceId: string) => void;
  texto: string;
  handlePlay: (voiceId: string, texto: string, setVoiceLoadingState: React.Dispatch<React.SetStateAction<string | null>>) => void;
  handleDownload: (voiceId: string, texto: string, setVoiceLoadingState: React.Dispatch<React.SetStateAction<string | null>>) => void;
  setVoiceLoadingState: React.Dispatch<React.SetStateAction<string | null>>;
  voiceLoadingState: string | null;
}

const VoiceSelect: React.FC<VoiceSelectProps> = ({ vozes, selectedVoice, onChange, texto, handlePlay, handleDownload, setVoiceLoadingState, voiceLoadingState }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const sortedVozes = [...vozes].sort((a, b) => a.name.localeCompare(b.name));

  const handlePlayPause = (voice: Voice) => {
    if (isPlaying === voice.voice_id) {
      audio?.pause();
      setIsPlaying(null);
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(voice.preview_url);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(voice.voice_id);
      newAudio.onended = () => setIsPlaying(null);
    }
  };

  const handleCardClick = (voiceId: string) => {
    if (selectedVoice?.voice_id === voiceId) {
      onChange('');
    } else {
      onChange(voiceId);
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
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Card.Meta
                  title={<Typography.Text className="responsive-title">
                    {voice.name}
                  </Typography.Text>}
                />
                <div className="voice-card-buttons">
                  <Button
                    type="text"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause(voice);
                    }}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {isPlaying === voice.voice_id ? (
                      <PauseCircleOutlined />
                    ) : (
                      <PlayCircleOutlined />
                    )}
                    <Typography.Text style={{ marginLeft: '5px', fontSize: '10px' }}>Preview</Typography.Text>
                  </Button>
                  {selectedVoice?.voice_id === voice.voice_id && texto && (
                    <>
                      {voiceLoadingState === `play-${voice.voice_id}` ? (
                        <LoadingOutlined style={{ marginLeft: '10px' }} />
                      ) : (
                        <Button
                          type="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlay(voice.voice_id, texto, setVoiceLoadingState);
                          }}
                          style={{ marginLeft: '10px' }}
                        >
                          Play
                        </Button>
                      )}
                      {voiceLoadingState === `download-${voice.voice_id}` ? (
                        <LoadingOutlined style={{ marginLeft: '10px' }} />
                      ) : (
                        <Button
                          type="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(voice.voice_id, texto, setVoiceLoadingState);
                          }}
                          style={{ marginLeft: '10px' }}
                        >
                          Download
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <Space direction="horizontal" style={{ marginTop: '10px' }} wrap>
                <Badge count={voice.category} style={{ backgroundColor: '#52c41a' }} />
                <Badge count={voice.description} style={{ backgroundColor: '#52c41a' }} />
                {voice.labels && Object.values(voice.labels).map((value, index) => (
                  <Badge key={index} count={value} style={{ backgroundColor: '#52c41a' }} />
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