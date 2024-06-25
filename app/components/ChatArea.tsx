'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, List, ListItem, Avatar, IconButton, useMediaQuery, Theme, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'user', text: input }]);
      setInput('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper elevation={0} sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default', borderRadius: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        {isSmallScreen && (
          <IconButton onClick={onOpenSidebar} sx={{ marginRight: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
          チャット
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2, display: 'flex', flexDirection: 'column' }}>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} sx={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: message.sender === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', maxWidth: '80%' }}>
                <Avatar sx={{ bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main', width: 32, height: 32 }}>
                  {message.sender === 'user' ? 'U' : 'B'}
                </Avatar>
                <Paper elevation={1} sx={{ 
                  padding: 2, 
                  ml: message.sender === 'user' ? 0 : 1,
                  mr: message.sender === 'user' ? 1 : 0,
                  bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                  color: theme.palette.mode === 'dark' ? 'text.primary' : (message.sender === 'user' ? 'primary.contrastText' : 'text.primary'),
                  borderRadius: message.sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                }}>
                  <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</Typography>
                </Paper>
              </Box>
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ padding: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" sx={{ mr: 1 }}>
            <AttachFileIcon />
          </IconButton>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            placeholder="メッセージを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ mr: 2 }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSend} 
            sx={{ 
              minWidth: '100px', 
              height: '56px',
              px: 3,
              '& .MuiButton-endIcon': {
                marginLeft: 1
              }
            }}
            endIcon={<SendIcon />}
          >
            送信
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
