'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, useMediaQuery, Theme, useTheme } from '@mui/material';
import HomeScreen from '@/app/components/HomeScreen';
import ChatScreen from '@/app/components/ChatScreen';
import Sidebar from '@/app/components/Sidebar';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [chatStarted, setChatStarted] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleStartChat = async (message: string, file?: File) => {
    setInitialMessage(message);
    setUploadedFile(file || null);
    setChatStarted(true);

    if (file) {
      // ファイルアップロードのダミー処理
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('File upload error:', error);
      }
    }
  };

  const handleNewChat = () => {
    setInitialMessage('');
    setUploadedFile(null);
    setChatStarted(true);
  };

  const handleChatSelect = (chatId: number) => {
    setInitialMessage(`チャットID: ${chatId}`);
    setUploadedFile(null);
    setChatStarted(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AnimatePresence mode="wait">
      {!chatStarted ? (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HomeScreen onStartChat={handleStartChat} />
        </motion.div>
      ) : (
        <motion.div
          key="chat"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <Box sx={{ display: 'flex', height: '100vh' }}>
            {(!isSmallScreen || sidebarOpen) && (
              <Sidebar
                onNewChat={handleNewChat}
                onChatSelect={handleChatSelect}
                onClose={isSmallScreen ? toggleSidebar : undefined}
                onNavigate={handleNavigate}
              />
            )}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <ChatScreen
                initialMessage={initialMessage}
                initialFile={uploadedFile}
                onOpenSidebar={toggleSidebar}
                showSidebarToggle={isSmallScreen}
              />
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}