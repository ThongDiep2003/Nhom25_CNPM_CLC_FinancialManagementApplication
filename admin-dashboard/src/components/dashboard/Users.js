// src/components/dashboard/Users.js
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Box,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import {
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { getDatabase, ref, onValue, update } from 'firebase/database';

export default function Users() {
  const [users, setUsers] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blockReason, setBlockReason] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setUsers(data || {});
    });
  }, []);

  const handleOpenBlockDialog = (uid, user) => {
    setSelectedUser({ uid, ...user });
    setBlockReason(user.blockReason || '');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setBlockReason('');
  };

  const handleToggleStatus = async () => {
    if (!selectedUser) return;

    const newStatus = selectedUser.status === 'blocked' ? 'active' : 'blocked';
    setLoading(true);

    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${selectedUser.uid}`);
      
      // Cập nhật trạng thái trong database
      await update(userRef, {
        status: newStatus,
        statusUpdatedAt: new Date().toISOString(),
        ...(newStatus === 'blocked' ? { blockReason } : { blockReason: null })
      });

      handleCloseDialog();
      alert(`User ${newStatus === 'blocked' ? 'blocked' : 'unblocked'} successfully`);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error ${newStatus === 'blocked' ? 'blocking' : 'unblocking'} user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = Object.entries(users).filter(([_, user]) =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search users"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Block Reason</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(([uid, user]) => (
              <TableRow 
                key={uid}
                sx={{
                  backgroundColor: user.status === 'blocked' ? '#ffebee' : 'inherit'
                }}
              >
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name || 'N/A'}</TableCell>
                <TableCell>{user.mobile || 'N/A'}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status || 'active'}
                    color={user.status === 'blocked' ? 'error' : 'success'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {user.blockReason || '-'}
                </TableCell>
                <TableCell>
                  <Tooltip title={user.status === 'blocked' ? 'Activate User' : 'Block User'}>
                    <IconButton 
                      color={user.status === 'blocked' ? 'success' : 'error'}
                      onClick={() => handleOpenBlockDialog(uid, user)}
                    >
                      {user.status === 'blocked' ? <CheckCircleIcon /> : <BlockIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser?.status === 'blocked' ? 'Activate User' : 'Block User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              User: {selectedUser?.email}
            </Typography>
            {selectedUser?.status !== 'blocked' && (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Reason for blocking"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                required
                sx={{ mt: 2 }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleToggleStatus}
            color={selectedUser?.status === 'blocked' ? 'success' : 'error'}
            disabled={loading}
          >
            {loading ? 'Processing...' : (selectedUser?.status === 'blocked' ? 'Activate' : 'Block')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
