import React, { useState } from 'react';
import { Select, MenuItem, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Voice } from '../types/voice';

interface VoiceSelectProps {
  vozes: Voice[];
  selectedVoice: Voice | null;
  onChange: (voiceId: string) => void;
}

const VoiceSelect: React.FC<VoiceSelectProps> = ({ vozes, selectedVoice, onChange }) => {
  return (
    <Select
      value={selectedVoice ? selectedVoice.voice_id : ''}
      onChange={(e) => onChange(e.target.value)}
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
  );
};

export default VoiceSelect;