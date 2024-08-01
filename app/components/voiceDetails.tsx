import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Voice } from '../types/voice';
import labelTranslations from './translations';

interface VoiceDetailsProps {
  selectedVoice: Voice;
}

const VoiceDetails: React.FC<VoiceDetailsProps> = ({ selectedVoice }) => {
  return (
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
      </CardContent>
    </Card>
  );
};

export default VoiceDetails;