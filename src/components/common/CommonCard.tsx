import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
type CardProps = {
  title: string;
  description: string;
  imageLink: string;
  published: boolean;
  price: string | number;
  deleteItem?: () => void;
  editItem?: () => void;
};
export default function CommonCard(props: CardProps) {
  return (
    <Card sx={{ maxWidth: 345, m: "2rem", minWidth: "200px" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.imageLink}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${props.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" onClick={props.editItem}>
          Edit
        </Button>
        <Button size="small" onClick={props.deleteItem}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
