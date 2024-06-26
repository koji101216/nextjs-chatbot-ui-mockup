import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaFileUpload } from 'react-icons/fa';
import { Box, Typography, TextField, Button, useTheme, IconButton } from '@mui/material';

interface HomeScreenProps {
  onStartChat: (message: string, file?: File) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartChat }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const theme = useTheme();

  useEffect(() => {
    console.log('HomeScreen mounted');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || file) {
      onStartChat(message, file || undefined);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('PDFファイルのみアップロード可能です。');
      }
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <FaRobot size={100} color={theme.palette.common.white} />
      </motion.div>
   
      <Typography variant="h2" sx={{ color: 'white', mt: 4, mb: 6, fontWeight: 'bold', textAlign: 'center' }}>
        AI Chat Assistant
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="メッセージを入力..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderRadius: '30px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
            },
            mb: 2,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <IconButton component="span" sx={{ color: 'white' }}>
              <FaFileUpload />
            </IconButton>
          </label>
          {file && <Typography sx={{ color: 'white' }}>{file.name}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: '30px',
              height: '56px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            送信 <FaPaperPlane style={{ marginLeft: '8px' }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreen;
