import { Paper, Typography, Grid } from "@mui/material";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import axiosUtil from "../utils/axiosUtil";

const EventsGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      let response = await axiosUtil.get(`/event/read.php`);
      console.log(response.data);
      setEvents(response.data);
      setLoading(false);
    } catch ({ response }) {
      console.log(response);
      if (response.status === 404) {
        setError("404 Events not found");
      } else {
        setError("Internal Server Error: " + response.status);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      {loading ? (
        <div
          style={{
            padding: "80px 0",
            textAlign: "center",
            minHeight: "var(--minimum-main-page-height)",
          }}
        >
          <img style={{ maxWidth: "70px" }} src="/loader.svg" alt="" />
        </div>
      ) : error && error.length > 0 ? (
        <Typography variant="h5">{error}</Typography>
      ) : (
        <Paper elevation={0} sx={{ bgcolor: "rgba(0, 0, 0, 0)" }}>
          <Grid container spacing={2}>
            {events.map((event) => (
              <Grid item xs={4}>
                <EventCard {...event} key={event.event_id} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default EventsGrid;
