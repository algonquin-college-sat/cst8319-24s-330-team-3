import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, CircularProgress } from '@mui/material';

const BookingDetails = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data with a timeout
    //this is placeholder, change them with real data pls
    setTimeout(() => {
      const placeholderData = {
        bookingId: 1,
        bookerEmail: "bookingtest@gmail.com",
        bookerName: "bookingtest",
        bookerPhone: "111111111",
        bookingDttm: "7/7/2024 17:17",
        bookingSeat: 12345,
        comments: "Needs a high chair"
      };
      setBooking(placeholderData);
      setLoading(false);
    }, 1000);
  }, [bookingId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Booking Details</Typography>
      {booking && (
        <Grid container spacing={2}>
          <Grid item xs={12}><Typography variant="body1"><strong>Booking ID:</strong> {booking.bookingId}</Typography></Grid>
          <Grid item xs={12}><Typography variant="body1"><strong>Booker Email:</strong> {booking.bookerEmail}</Typography></Grid>
          <Grid item xs={12}><Typography variant="body1"><strong>Booker Name:</strong> {booking.bookerName}</Typography></Grid>
          <Grid item xs={12}><Typography variant="body1"><strong>Booker Phone:</strong> {booking.bookerPhone}</Typography></Grid>
          <Grid item xs={12}><Typography variant="body1"><strong>Booking Date/Time:</strong> {booking.bookingDttm}</Typography></Grid>
          <Grid item xs={12}><Typography variant="body1"><strong>Booking Seat:</strong> {booking.bookingSeat}</Typography></Grid>
          <Grid item xs={12}><Typography variant="body1"><strong>Comments:</strong> {booking.comments}</Typography></Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default BookingDetails;
