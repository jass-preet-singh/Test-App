import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Box, Container, Paper } from "@mui/material";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "https://swiperjs.com/demos/images/nature-1.jpg",
  "https://swiperjs.com/demos/images/nature-2.jpg",
  "https://swiperjs.com/demos/images/nature-3.jpg",
  "https://swiperjs.com/demos/images/nature-4.jpg",
];

const Carousel: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            overflow: "hidden",
            width: "100%",
            maxWidth: 1400,
          }}
        >
          <Swiper
            // spaceBetween={50}
            effect={"fade"}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            className="mySwiper"
            style={{ width: "100%", height: "100%" }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "450px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Paper>
      </Box>
    </Container>
  );
};

export default Carousel;
