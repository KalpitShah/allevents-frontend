import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";
import axiosUtil from "../utils/axiosUtil";

const CreateEvent = () => {
  let { currentUser, loading } = useAuth();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!currentUser) navigate("/login");
    axiosUtil.get(`/category/read.php`).then((response) => {
      console.log(response);
      setCategories(response.data);
    });
  }, [currentUser, loading]);

  const [form, setForm] = useState({
    name: "",
    start_time: "",
    end_time: "",
    description: "",
    category: -1,
    city: "",
    location: "",
    banner_image: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    start_time?: string;
    end_time?: string;
    description?: string;
    category?: string;
    city?: string;
    location?: string;
    banner_image?: string;
  }>({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setForm({
      ...form,
      category: e.target.value,
    });
  };

  const validateForm = () => {
    let formErrors: {
      name?: string;
      start_time?: string;
      end_time?: string;
      description?: string;
      category?: string;
      city?: string;
      location?: string;
      banner_image?: string;
    } = {};

    // Add your form validation logic here
    // For example:
    if (!form.name) formErrors.name = "Event name is required";
    if (!form.start_time) formErrors.start_time = "Start time is required";
    if (!form.end_time) formErrors.end_time = "End time is required";
    if (form.start_time && form.end_time && form.start_time >= form.end_time)
      formErrors.end_time = "End time should be greater than start time";
    if (!form.description) formErrors.description = "Description is required";
    if (!form.category) formErrors.category = "Category is required";
    if (form.category && form.category == -1)
      formErrors.category = "Select a valid Category";
    if (!form.city) formErrors.city = "City is required";
    if (!form.location) formErrors.location = "Location is required";
    if (!form.banner_image)
      formErrors.banner_image = "Banner Image is required";

    setErrors(formErrors);

    // If the errors object is empty, the form is valid
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(form);

      axiosUtil
        .post(`/event/create.php`, {
          ...form,
          user_id: currentUser.uid,
        })
        .then((response) => {
          navigate(`/event/${response.data}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Create an Event
      </Typography>
      <TextField
        id="name"
        label="Event Name"
        variant="outlined"
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Box sx={{ mb: 3 }}>
        <TextField
          id="start_time"
          label="Start Time"
          variant="outlined"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          error={!!errors.start_time}
          helperText={errors.start_time}
          sx={{ mr: 3 }}
        />
        <TextField
          id="end_time"
          label="End Time"
          variant="outlined"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          error={!!errors.end_time}
          helperText={errors.end_time}
        />
      </Box>
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        sx={{ mb: 3 }}
        multiline
        rows={4}
        error={!!errors.description}
        helperText={errors.description}
      />
      <FormControl variant="outlined" fullWidth sx={{ mb: 3 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={form.category}
          onChange={handleCategoryChange}
          label="Category"
          error={!!errors.category}
        >
          <MenuItem value={-1}>Select</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {errors.category && (
          <FormHelperText error>{errors.category}</FormHelperText>
        )}
      </FormControl>
      <TextField
        id="location"
        label="Location"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        sx={{ mb: 3 }}
        error={!!errors.location}
        helperText={errors.location}
      />
      <TextField
        id="city"
        label="City"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        sx={{ mb: 3 }}
        error={!!errors.city}
        helperText={errors.city}
      />
      <TextField
        id="banner_image"
        label="Banner Image URL"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        error={!!errors.banner_image}
        helperText={errors.banner_image}
      />
      <FormHelperText sx={{ mb: 3 }}>
        Due to time constrait File Input is not implemented for Banner Image.
        Use any image url or you can use
        "https://cdn2.allevents.in/thumbs/thumb6457e71cdd312.jpg"
      </FormHelperText>
      <Button type="submit" variant="contained" color="primary">
        Create Event
      </Button>
    </form>
  );
};

export default CreateEvent;
