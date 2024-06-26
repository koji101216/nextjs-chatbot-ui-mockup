'use client';

import React, { useState } from 'react';
import { Box, useMediaQuery, Theme, useTheme } from '@mui/material';
import Sidebar from '@/app/components/Sidebar';
import ChatScreen from '@/app/components/ChatScreen';

export default function ChatPage() {
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleChatSelect = (chatId: number) => {
    setCurrentChatId(chatId);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {!isSmallScreen && (
        <Sidebar onNewChat={handleNewChat} onChatSelect={handleChatSelect} onNavigate={() => {}} />
      )}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <ChatScreen
          initialMessage={currentChatId ? `チャットID: ${currentChatId}` : '新規チャット'}
          onOpenSidebar={() => {}}
          showSidebarToggle={isSmallScreen}
        />
      </Box>
    </Box>
  );
}
