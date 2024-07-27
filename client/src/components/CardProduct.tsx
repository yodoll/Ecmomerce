import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "src/types/Product";


function CardProduct({_id, title, image, price} : Product) {
    const handleCart = () => {
        console.log("added card!");
        
    }
    return (
        <>
            <Card
                style={{
                    // maxWidth: 300,
                    margin: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                }}
            >
                <CardMedia
                    component="img"
                    style={{ height: 200, objectFit: "cover" }}
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}>
                        {title}...
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "16px" }}>
                        Price: ${price}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button onClick={handleCart} size="small" color="primary">
                        Add to cart
                    </Button>
                    <Link to={`/products/${_id}`} style={{ textDecoration: "none" }}>
                        <Button size="small" color="primary">
                            View Detail
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </>
    );
}
export default CardProduct;
