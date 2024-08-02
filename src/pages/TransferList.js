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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { parse, format } from 'date-fns';

const parseDate = (dateString) => {
  return parse(dateString, 'yyyy/MM/dd HH:mm', new Date());
};

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function TransferList({selectedDate}) {
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFinishDialog, setOpenFinishDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [uid, setUid] = useState(null);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [inputText, setInputText] = useState("");
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

        // Function to filter bookings by selected date
        const filteredBookings = bookings.filter((booking) => {
          const bookingDate = parseDate(booking.bookingDttm);
          return bookingDate.toDateString() === selectedDate.toDateString();
        });

        const unhandledBookings = filteredBookings.filter(
          (booking) => !booking.isHandled && !booking.isDenied
        );
        const handledBookings = filteredBookings.filter((booking) => booking.isHandled);
        setLeft(unhandledBookings);
        setRight(handledBookings);
      };

      fetchBookings();
    }
  }, [uid, selectedDate]);

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

    const denialReasons = [];
    if (checkbox1) denialReasons.push("No seat available");
    if (checkbox2) denialReasons.push("Can't follow the comment");
    if (checkbox3) denialReasons.push("Don't accept reservations right now");
    if (inputText) denialReasons.push(`Additional Info: ${inputText}`);

    await updateDoc(doc(db, "Bookings", selectedItem.id), {
      isDenied: true,
      denialReason: denialReasons.join(", "),
    });
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
    navigate(`/bookingdetails/${item.id}`, { state: { bookingId: item.id, selectedDate } });
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
        <DialogTitle id="delete-dialog-title" style={{ fontWeight: "bold" }}>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="delete-dialog-description"
            style={{ fontWeight: "bold" }}
          >
            This action will permanently delete the item.
          </DialogContentText>
          <p></p>
          <DialogContentText>Choose the reason</DialogContentText>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkbox1}
                onChange={(e) => setCheckbox1(e.target.checked)}
                name="checkbox1"
                color="primary"
              />
            }
            label="No seat available"
          />
          <p></p>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkbox2}
                onChange={(e) => setCheckbox2(e.target.checked)}
                name="checkbox2"
                color="primary"
              />
            }
            label="Can't follow the comment"
          />
          <p></p>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkbox3}
                onChange={(e) => setCheckbox3(e.target.checked)}
                name="checkbox3"
                color="primary"
              />
            }
            label="Don't accept reservations right now"
          />
          <TextField
            label="Additional Information"
            fullWidth
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            margin="normal"
          />
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
