import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function TransferList() {
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFinishDialog, setOpenFinishDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (uid) {
      const fetchBookings = async () => {
        const q = query(
          collection(db, "Bookings"),
          where("restaurantId", "==", uid)
        );
        const querySnapshot = await getDocs(q);
        const bookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const unhandledBookings = bookings.filter(
          (booking) => !booking.isHandled
        );
        const handledBookings = bookings.filter((booking) => booking.isHandled);
        setLeft(unhandledBookings);
        setRight(handledBookings);
      };

      fetchBookings();
    }
  }, [uid]);

  const handleAcceptItem = (item) => async () => {
    setRight([...right, item]);
    setLeft(not(left, [item]));

    await updateDoc(doc(db, "Bookings", item.id), { isHandled: true });
  };

  const handleDenyItem = (item) => () => {
    setSelectedItem(item);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setOpenDeleteDialog(false);
    setLeft(not(left, [selectedItem]));

    await deleteDoc(doc(db, "Bookings", selectedItem.id));
    setSelectedItem(null);
  };

  const handleFinishItem = (item) => () => {
    setSelectedItem(item);
    setOpenFinishDialog(true);
  };

  const handleConfirmFinish = async () => {
    setOpenFinishDialog(false);
    setRight(not(right, [selectedItem]));

    await updateDoc(doc(db, "Bookings", selectedItem.id), { isFinished: true });
  };

  const handleDetails = (item) => () => {
    navigate(`/bookingdetails/${item.id}`, { state: { bookingId: item.id } });
  };

  const customList = (items, isLeftColumn) => (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        minHeight: "400px",
        padding: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {isLeftColumn
          ? "Reservations Not Being Handled"
          : "Reservations Being Accepted"}
      </Typography>
      <List dense component="div" role="list">
        {items.map((item) => {
          const labelId = `transfer-list-item-${item.id}-label`;

          return (
            <React.Fragment key={item.id}>
              <ListItem divider>
                <ListItemButton role="listitem">
                  <ListItemText
                    id={labelId}
                    primary={`${item.bookerName} ${item.bookingDttm}`}
                    secondary={`Seats: ${item.bookingSeat}`}
                  />
                  {isLeftColumn && (
                    <>
                      <Button
                        size="small"
                        onClick={handleAcceptItem(item)}
                        sx={{
                          backgroundColor: "lightgreen",
                          color: "black",
                          marginRight: 1,
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        size="small"
                        onClick={handleDenyItem(item)}
                        sx={{
                          backgroundColor: "lightgrey",
                          color: "black",
                          marginRight: 1,
                        }}
                      >
                        Deny
                      </Button>
                      <Button
                        size="small"
                        onClick={handleDetails(item)}
                        sx={{ color: "black" }}
                      >
                        Details
                      </Button>
                    </>
                  )}
                  {!isLeftColumn && (
                    <>
                      <Button
                        size="small"
                        onClick={handleDetails(item)}
                        sx={{ color: "black" }}
                      >
                        Details
                      </Button>
                      <Button
                        size="small"
                        onClick={handleFinishItem(item)}
                        sx={{
                          backgroundColor: "lightgrey",
                          color: "black",
                        }}
                        disabled={item.isFinished}
                      >
                        {item.isFinished ? "Finished" : "Finish"}
                      </Button>
                    </>
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
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
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
        <DialogTitle id="finish-dialog-title">
          Did you finish the reservation?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="finish-dialog-description">
            Are you sure you want to finish this reservation? This action cannot
            be undone.
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
