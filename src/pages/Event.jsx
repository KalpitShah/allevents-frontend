import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import axiosUtil from "../utils/axiosUtil";
import { useParams } from "react-router-dom";

const Event = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [event, setEvent] = useState({});
  const [error, setError] = useState<string | null>(null);
  let { id } = useParams();

  const fetchEvent = async () => {
    try {
      let response = await axiosUtil.get(`/event/read.php?id=${id}`);
      console.log(response);
      setEvent(response.data);
      setLoading(false);
    } catch ({ response }) {
      console.log(response);
      if (response.status === 404) {
        setError("404 Event not found");
      } else {
        setError("Internal Server Error: " + response.status);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvent();
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
        <>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={event.banner_image}
              alt={event.name}
            />
            <CardContent>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "600", mb: 1 }}>
                  {event.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: "600" }}
                >
                  {event.category} | {event.location} | 5th May
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
                <Typography>{event.description}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
                <Typography>{event.description}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
                <Typography variant={"h6"} sx={{ mb: 1 }}>
                  Hosted By
                </Typography>
                {/* <Box>
              <Avatar src={event.author.image} alt={event.author.name} />
              <Typography>{event.author.name}</Typography>
            </Box> */}
                {/* <Card elevation={0}>
                  <CardHeader
                    sx={{ p: 0 }}
                    avatar={
                      <Avatar
                        sx={{ bgcolor: "var(--color-primary)" }}
                        aria-label="recipe"
                      >
                        {event.author.name[0]}
                      </Avatar>
                    }
                    title={event.author.name}
                    subheader="September 14, 2016"
                  />
                </Card> */}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Event;
