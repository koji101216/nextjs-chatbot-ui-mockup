'use client';

import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider, Typography, Avatar, Button, useTheme } from '@mui/material';
import { Add as AddIcon, Chat as ChatIcon, Person as PersonIcon, Notifications as NotificationsIcon, History as HistoryIcon, Close as CloseIcon } from '@mui/icons-material';

interface Chat {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
}

const dummyChats: Chat[] = [
  { id: 1, title: 'チャット 1', lastMessage: 'こんにちは！', timestamp: '14:30' },
  { id: 2, title: 'チャット 2', lastMessage: 'お疲れ様です。', timestamp: '昨日' },
  { id: 3, title: 'チャット 3', lastMessage: 'ありがとうございました。', timestamp: '月曜日' },
];

interface SidebarProps {
  onNewChat: () => void;
  onChatSelect: (chatId: number) => void;
  onClose?: () => void;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewChat, onChatSelect, onClose, onNavigate }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      width: 280,
      height: '100%',
      bgcolor: 'background.paper',
      borderRight: `1px solid ${theme.palette.divider}`,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2 }}>U</Avatar>
          <Typography variant="subtitle1">ユーザー名</Typography>
        </Box>
        {onClose && (
          <Button onClick={onClose} sx={{ minWidth: 'auto', p: 1 }}>
            <CloseIcon />
          </Button>
        )}
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onNewChat}
        sx={{ m: 2 }}
      >
        新規チャット
      </Button>

      <Typography variant="h6" sx={{ px: 2, py: 1 }}>チャット履歴</Typography>
      <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {dummyChats.map((chat) => (
          <ListItem key={chat.id} disablePadding>
            <ListItemButton onClick={() => onChatSelect(chat.id)}>
              <ListItemIcon>
                <ChatIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={chat.title} 
                secondary={`${chat.lastMessage} - ${chat.timestamp}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onNavigate('/settings')}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="設定" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onNavigate('/history')}>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="履歴" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
