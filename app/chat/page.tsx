'use client';

import React, { useState } from 'react';
import { Box, useMediaQuery, Theme, useTheme } from '@mui/material';
import Sidebar from '@/app/components/Sidebar';
import ChatArea from '@/app/components/ChatArea';

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          width: isSmallScreen ? (sidebarOpen ? '100%' : 0) : 280,
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderRight: `1px solid ${theme.palette.divider}`,
          display: isSmallScreen ? (sidebarOpen ? 'block' : 'none') : 'block',
          position: isSmallScreen ? 'fixed' : 'relative',
          zIndex: theme.zIndex.drawer,
          height: '100%',
          transition: 'width 0.3s',
        }}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <ChatArea onOpenSidebar={() => setSidebarOpen(true)} />
      </Box>
    </Box>
  );
}
