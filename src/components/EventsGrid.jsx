import {
  Paper,
  Typography,
  Grid,
  Select,
  Button,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import axiosUtil from "../utils/axiosUtil";

const EventsGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ category: -1, city: -1, date: "" });
  const [cities, setCities] = useState([]);

  const fetchEvents = async () => {
    try {
      let response = await axiosUtil.get(`/event/read.php`);
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

  const handleCategoryChange = (e) => {
    setFilters((oldValue) => ({ ...oldValue, category: e.target.value }));
  };

  const handleCityChange = (e) => {
    setFilters((oldValue) => ({ ...oldValue, city: e.target.value }));
  };

  const handleDateChange = (e) => {
    setFilters((oldValue) => ({ ...oldValue, date: e.target.value }));
  };

  const fetchCategories = async () => {
    axiosUtil.get(`/category/read.php`).then((response) => {
      setCategories(response.data);
    });
  };

  const fetchCities = async () => {
    axiosUtil.get(`/city/read.php`).then((response) => {
      setCities(response.data);
    });
  };

  const filterEvents = async () => {
    setLoading(true);
    axiosUtil
      .get(
        `/event/filter.php?city=${filters.city}&category=${filters.category}&date=${filters.date}`
      )
      .then((response) => {
        setEvents(response.data);
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status === 404) {
          setEvents([]);
        } else {
          setError("Internal Server Error: " + response.status);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchEvents();
    fetchCategories();
    fetchCities();
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
          <Paper elevation={1} sx={{ mb: 2, p: 1 }}>
            <FormControl variant="outlined" sx={{ mr: 2 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                sx={{ mr: 2, minWidth: 200 }}
                labelId="category-label"
                id="category"
                value={filters.category}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value={-1}>Select</MenuItem>
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ mr: 2 }}>
              <InputLabel id="category-label">City</InputLabel>
              <Select
                sx={{ mr: 2, minWidth: 200 }}
                labelId="city-label"
                id="city"
                value={filters.city}
                onChange={handleCityChange}
                label="City"
              >
                <MenuItem value={-1}>Select</MenuItem>
                {cities?.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="date"
              label="Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={handleDateChange}
              value={filters.date}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" onClick={filterEvents}>
              Apply
            </Button>
          </Paper>
          <Grid container spacing={2}>
            {events.length > 0 ? (
              events.map((event, index) => (
                <Grid key={index} item xs={12} md={6} lg={4}>
                  <EventCard {...event} key={event.event_id} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} md={6} lg={4}>
                <Typography>No Event found</Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default EventsGrid;
