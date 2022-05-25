import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.primary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Info</Box>
              <Box>
                <Link
                  href="https://arch.ugent.be/hennebique/"
                  color="inherit"
                  underline="hover"
                >
                  Site Hennebique and After
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Contact</Box>
              <Box>
                <Link
                  href="mailto: julien.deleyn@ugent.be"
                  color="inherit"
                  underline="hover"
                >
                  Julien.DeLeyn@Ugent.be
                </Link>
              </Box>
              <Box>
                <Link
                  href="mailto: vadin.degheselle@ugent.be"
                  color="inherit"
                  underline="hover"
                >
                  Vadin.Degheselle@Ugent.be
                </Link>
              </Box>
              <Box>
                <Link
                  underline="hover"
                  href="https://www.google.com/maps/place/Jozef+Plateaustraat+22,+9000+Gent/@51.0461292,3.7226704,17z/data=!3m1!4b1!4m5!3m4!1s0x47c3715ab921389d:0x39c5e78f294c2682!8m2!3d51.0461258!4d3.7248591"
                  color="inherit"
                >
                  Jozef Plateaustraat 22, Gent
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Support
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
