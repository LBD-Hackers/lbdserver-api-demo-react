import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function StandardImageList() {
  return (
    <Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <ImageList sx={{ width: 1000, height: 900 }} cols={3} rowHeight={328}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Grid>
  );
}

const itemData = [
  {
    img: "http://localhost:5000/julien/images/ImageList1.jpg",
    title: "ImageList1",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList2.jpg",
    title: "ImageList2",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList3.jpg",
    title: "ImageList3",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList4.jpg",
    title: "ImageList4",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList5.jpg",
    title: "ImageList5",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList6.jpg",
    title: "ImageList6",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList7.jpg",
    title: "ImageList7",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList8.jpg",
    title: "ImageList8",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList9.jpg",
    title: "ImageList9",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList10.jpg",
    title: "ImageList10",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList11.jpg",
    title: "ImageList11",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList12.jpeg",
    title: "ImageList12",
  },
  {
    img: "http://localhost:5000/julien/images/ImageList13.jpeg",
    title: "ImageList13",
  },
];
