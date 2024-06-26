'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar, Switch, FormControlLabel, Paper, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [name, setName] = useState('ユーザー名');
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();

  const handleSave = () => {
    // 設定を保存する処理をここに実装
    console.log('Settings saved');
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // アバター画像を変更する処理をここに実装
    console.log('Avatar changed');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 3
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
            設定
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar
                sx={{ width: 100, height: 100, cursor: 'pointer' }}
                alt={name}
                src="/path-to-avatar-image.jpg"
                onClick={() => document.getElementById('avatar-input')?.click()}
              />
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="名前"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    color="primary"
                  />
                }
                label="通知を受け取る"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    color="primary"
                  />
                }
                label="ダークモード"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ mt: 2 }}
              >
                保存
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Box>
  );
}
