import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Grid, CircularProgress } from "@mui/material";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const docRef = doc(db, "Bookings", bookingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBooking(docSnap.data());
        } else {
          console.log("No matching booking found.");
        }
      } catch (error) {
        console.error("Error fetching booking: ", error);
      }
    };

    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, "BookingComments"),
          where("bookingID", "==", bookingId)
        );
        const querySnapshot = await getDocs(q);
        const comments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(comments);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchBooking(), fetchComments()]);
      setLoading(false);
    };

    fetchData();
  }, [bookingId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      {booking && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Booking ID:</strong> {bookingId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Booker Email:</strong> {booking.bookerEmail}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Booker Name:</strong> {booking.bookerName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Booker Phone:</strong> {booking.bookerPhone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Booking Date/Time:</strong> {booking.bookingDttm}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Booking Seat:</strong> {booking.bookingSeat}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Typography key={comment.id} variant="body1">
                  <strong>Comments:</strong> {comment.commentContent}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">No comments available</Typography>
            )}
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default BookingDetails;
