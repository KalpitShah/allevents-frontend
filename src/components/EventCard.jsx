import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

const EventCard = ({
  name,
  start_date,
  end_date,
  location,
  description,
  banner_image,
  slug,
  event_id,
}) => {
  console.log(start_date, end_date);
  return (
    <Card elevation={1}>
      <CardActionArea component={Link} to={"/event/" + event_id}>
        <CardMedia
          component="img"
          height="194"
          image={banner_image}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            color="primary"
          >
            {location} | {start_date}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
