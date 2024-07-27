
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";

const images = [
  {
    url: "/public/banner1.webp",
    title: "Image 1",
  },
  {
    url: "/public/banner2.webp",
    title: "Image 2",
  },
  {
    url: "/public/banner3.webp",
    title: "Image 3",
  },
];

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", marginTop: 8 }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={image.url}
              alt={image.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "600px", // Điều chỉnh chiều cao tối đa
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                color: "#fff",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {image.title}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Slideshow;
