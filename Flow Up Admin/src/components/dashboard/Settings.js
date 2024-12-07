// src/components/dashboard/Settings.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
} from '@mui/material';

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Admin Dashboard',
    emailNotifications: true,
    maintenance: false,
    backupFrequency: 'daily',
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically save the settings to your database
    console.log('Settings saved:', settings);
    alert('Settings saved successfully');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          General Settings
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Site Name"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    name="emailNotifications"
                  />
                }
                label="Email Notifications"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.maintenance}
                    onChange={handleChange}
                    name="maintenance"
                  />
                }
                label="Maintenance Mode"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Backup Frequency"
                name="backupFrequency"
                value={settings.backupFrequency}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}