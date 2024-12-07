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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

export default function Forum() {
  const [forums, setForums] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedForum, setSelectedForum] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const forumRef = ref(db, 'forum');
    
    onValue(forumRef, (snapshot) => {
      const data = snapshot.val();
      setForums(data || {});
    });
  }, []);

  const handleDelete = async (forumId) => {
    if (window.confirm('Are you sure you want to delete this forum post and all its replies?')) {
      try {
        const db = getDatabase();
        await remove(ref(db, `forum/${forumId}`));
        alert('Forum post deleted successfully');
      } catch (error) {
        console.error('Error deleting forum post:', error);
        alert('Failed to delete forum post');
      }
    }
  };

  const handleDeleteReply = async (forumId, replyId) => {
    if (window.confirm('Are you sure you want to delete this reply?')) {
      try {
        const db = getDatabase();
        await remove(ref(db, `forum/${forumId}/replies/${replyId}`));
        alert('Reply deleted successfully');
      } catch (error) {
        console.error('Error deleting reply:', error);
        alert('Failed to delete reply');
      }
    }
  };

  const handleViewDetails = (forum, forumId) => {
    setSelectedForum({ ...forum, id: forumId });
    setOpenDialog(true);
  };

  const filteredForums = Object.entries(forums).filter(([_, forum]) =>
    forum.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    forum.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Forum Management
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search forums"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Posted By</TableCell>
              <TableCell>Posted At</TableCell>
              <TableCell>Replies</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredForums.map(([forumId, forum]) => (
              <TableRow key={forumId}>
                <TableCell>{forum.question}</TableCell>
                <TableCell>{forum.email}</TableCell>
                <TableCell>
                  {new Date(forum.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  {forum.replies ? Object.keys(forum.replies).length : 0}
                </TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleViewDetails(forum, forumId)}>
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Post">
                    <IconButton 
                      color="error"
                      onClick={() => handleDelete(forumId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Forum Post Details</DialogTitle>
        <DialogContent>
          {selectedForum && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Question: {selectedForum.question}
              </Typography>
              
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Posted by: {selectedForum.email} |
                Date: {new Date(selectedForum.timestamp).toLocaleString()}
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Replies:
              </Typography>

              <List>
                {selectedForum.replies && Object.entries(selectedForum.replies).map(([replyId, reply]) => (
                  <React.Fragment key={replyId}>
                    <ListItem
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteReply(selectedForum.id, replyId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={reply.reply}
                        secondary={
                          <>
                            By: {reply.email} |
                            Date: {reply.timestamp ? new Date(reply.timestamp).toLocaleString() : 'N/A'} |
                            Status: {reply.read ? 'Read' : 'Unread'}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}