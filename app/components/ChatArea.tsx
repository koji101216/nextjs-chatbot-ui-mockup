'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText, Divider, IconButton, useMediaQuery, Theme, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';

const dummyMessages = [
  { id: 1, sender: 'user', text: 'こんにちは！' },
  { id: 2, sender: 'bot', text: 'こんにちは！どのようにお手伝いできますか？' },
];

interface ChatAreaProps {
  onOpenSidebar?: () => void;
}

export default function ChatArea({ onOpenSidebar }: ChatAreaProps) {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'user', text: input }]);
      setInput('');
    }
  };

  return (
    <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        {isSmallScreen && (
          <IconButton onClick={onOpenSidebar} sx={{ marginRight: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, color: 'primary.main' }}>
          チャット
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} sx={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper elevation={1} sx={{ 
                padding: 1.5, 
                maxWidth: '70%', 
                bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                borderRadius: message.sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
              }}>
                <Typography variant="body1">{message.text}</Typography>
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ padding: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="メッセージを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            sx={{ marginRight: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSend} endIcon={<SendIcon />}>
            送信
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
