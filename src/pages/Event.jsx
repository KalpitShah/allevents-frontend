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
import printDate from "../utils/formatDate";

const Event = () => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  let { id } = useParams();

  const fetchEvent = async () => {
    try {
      let response = await axiosUtil.get(`/event/read.php?id=${id}`);
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

    axiosUtil.get(`/category/read.php`).then((response) => {
      console.log(response.data);
      setCategories(response.data);
    });
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
                  {
                    categories?.filter((cat) => cat.id === event.category_id)[0]
                      ?.name
                  }{" "}
                  | {event.location} |{" "}
                  {printDate(event.start_time, event.end_time)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
                <Typography variant={"h6"} sx={{ mb: 1 }}>
                  Description
                </Typography>
                <Typography>{event.description}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
                <Typography variant={"h6"} sx={{ mb: 1 }}>
                  Hosted By
                </Typography>
                <Card elevation={0}>
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
                    subheader="Allevents User"
                  />
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Event;
