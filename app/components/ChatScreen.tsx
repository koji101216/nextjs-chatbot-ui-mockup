import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, useTheme, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Send as SendIcon, Menu as MenuIcon } from '@mui/icons-material';
import { FaRobot, FaUser } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  file?: File;
}

interface ChatScreenProps {
  initialMessage: string;
  initialFile?: File | null;
  onOpenSidebar: () => void;
  showSidebarToggle: boolean;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ initialMessage, initialFile, onOpenSidebar, showSidebarToggle }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const theme = useTheme();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage) {
      handleSend(initialMessage, 'user', initialFile);
    }
  }, [initialMessage, initialFile]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = (text: string, sender: 'user' | 'bot' = 'user', file?: File | null) => {
    if (text.trim() || file) {
      const newMessage: Message = { id: Date.now(), text, sender, file: file || undefined };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      
      if (sender === 'user') {
        // ボットの応答をシミュレート
        setTimeout(() => {
          const botResponse: Message = {
            id: Date.now() + 1,
            text: `あなたのメッセージ "${text}" を受け取りました。${file ? 'ファイルも受け取りました。' : ''}`,
            sender: 'bot',
          };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 1000);
      }
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center' }}>
        {showSidebarToggle && (
          <IconButton onClick={onOpenSidebar} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6">チャット</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    borderRadius: 4,
                    bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main', mr: 1 }}>
                      {message.sender === 'user' ? <FaUser /> : <FaRobot />}
                    </Avatar>
                    <Typography variant="subtitle2" color="text.secondary">
                      {message.sender === 'user' ? 'あなた' : 'AI'}
                    </Typography>
                  </Box>
                  <Typography variant="body1">{message.text}</Typography>
                  {message.file && (
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                      添付ファイル: {message.file.name}
                    </Typography>
                  )}
                </Paper>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSend(input); }} sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="メッセージを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            送信
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatScreen;
