import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Product } from "src/types/Product";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  margin: "10px",
  boxShadow: `0 4px 8px ${theme.palette.primary.main}40`,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:hover .overlay": {
    opacity: 1,
    visibility: "visible",
  },
}));

const Overlay = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
}));

const OverlayContent = styled("div")(() => ({
  textAlign: "center",
  "& > *": {
    margin: "0 10px",
  },
}));

function CardProduct({ _id, title, image, price }: Product) {
  const handleCart = () => {
    console.log("added to cart!");
  };

  return (
    <StyledCard>
      <CardMedia component="img" image={image} alt={title} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "16px" }}
        >
          Price: ${price}
        </Typography>
      </CardContent>
      <Overlay className="overlay">
        <OverlayContent>
          <Button
            onClick={handleCart}
            size="small"
            color="primary"
            variant="contained"
          >
            Add to cart
          </Button>
          <Link to={`/products/${_id}`} style={{ textDecoration: "none" }}>
            <Button size="small" color="primary" variant="contained">
              View Detail
            </Button>
          </Link>
        </OverlayContent>
      </Overlay>
    </StyledCard>
  );
}

export default CardProduct;
