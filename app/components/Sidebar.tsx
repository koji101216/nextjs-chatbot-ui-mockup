'use client';

import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider, Typography, IconButton, useMediaQuery, Theme, useTheme, Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';

const dummyChats = [
  { id: 1, title: 'チャット 1', lastMessage: 'こんにちは！', timestamp: '14:30' },
  { id: 2, title: 'チャット 2', lastMessage: 'お疲れ様です。', timestamp: '昨日' },
  { id: 3, title: 'チャット 3', lastMessage: 'ありがとうございました。', timestamp: '月曜日' },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      padding: 2,
      borderRight: `1px solid ${theme.palette.divider}`,
      bgcolor: 'background.paper',
      boxShadow: 3,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {isSmallScreen && (
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', mr: 2 }}>U</Avatar>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          ユーザー名
        </Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary', fontWeight: 'medium' }}>
        チャット履歴
      </Typography>
      <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {dummyChats.map((chat) => (
          <ListItem key={chat.id} disablePadding>
            <ListItemButton
              onClick={() => router.push(`/chat/${chat.id}`)}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              }}
            >
              <ListItemIcon>
                <ChatIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={chat.title} 
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                      {chat.lastMessage}
                    </Typography>
                    {" — " + chat.timestamp}
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary', fontWeight: 'medium' }}>
        設定
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push('/settings')}
            sx={{
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'primary.light',
              },
            }}
          >
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="プロフィール編集" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'primary.light',
              },
            }}
          >
            <ListItemIcon>
              <NotificationsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="通知設定" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push('/history')}
            sx={{
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'primary.light',
              },
            }}
          >
            <ListItemIcon>
              <HistoryIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="会話履歴" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
