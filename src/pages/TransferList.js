import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function TransferList() {
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFinishDialog, setOpenFinishDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleAcceptItem = (item) => () => {
    setRight([...right, item]);
    setLeft(not(left, [item]));
  };

  const handleDenyItem = (item) => () => {
    setSelectedItem(item);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false);
    setLeft(not(left, [selectedItem]));
    setSelectedItem(null);
  };

  const handleFinishItem = (item) => () => {
    setSelectedItem(item);
    setOpenFinishDialog(true);
  };

  const handleConfirmFinish = () => {
    setOpenFinishDialog(false);
    setRight(not(right, [selectedItem]));
    setSelectedItem(null);
  };

  const handleDetails = (item) => () => {
    navigate(`/bookingdetails/${item}`);
  };

  const customList = (items, isLeftColumn) => (
    <Paper sx={{ width: '100%', height: '100%', overflow: 'auto', minHeight: '400px', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        {isLeftColumn ? 'Reservations Not Being Handled' : 'Reservations Being Accepted'}
      </Typography>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <React.Fragment key={value}>
              <ListItem divider>
                <ListItemButton role="listitem">
                  <ListItemText id={labelId} primary={`Reservation ${value + 1}`} />
                  {isLeftColumn && (
                    <>
                      <Button
                        size="small"
                        onClick={handleAcceptItem(value)}
                        sx={{ backgroundColor: 'lightgreen', color: 'black', marginRight: 1 }}
                      >
                        Accept
                      </Button>
                      <Button
                        size="small"
                        onClick={handleDenyItem(value)}
                        sx={{ backgroundColor: 'lightgrey', color: 'black', marginRight: 1 }}
                      >
                        Deny
                      </Button>
                      <Button
                        size="small"
                        onClick={handleDetails(value)}
                        sx={{ color: 'black' }}
                      >
                        Details
                      </Button>
                    </>
                  )}
                  {!isLeftColumn && (
                    <Button
                      size="small"
                      onClick={handleFinishItem(value)}
                      sx={{ backgroundColor: 'lightgrey', color: 'black' }}
                    >
                      Finish
                    </Button>
                  )}
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={5}>
        {customList(left, true)}
      </Grid>
      <Grid item xs={5}>
        {customList(right, false)}
      </Grid>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            This action will permanently delete the item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openFinishDialog}
        onClose={() => setOpenFinishDialog(false)}
        aria-labelledby="finish-dialog-title"
        aria-describedby="finish-dialog-description"
      >
        <DialogTitle id="finish-dialog-title">Did you finish the reservation?</DialogTitle>
        <DialogContent>
          <DialogContentText id="finish-dialog-description">
            Are you sure you want to finish this reservation? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFinishDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmFinish} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default TransferList;
