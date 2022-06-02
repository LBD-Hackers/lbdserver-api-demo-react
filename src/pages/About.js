import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

const About = () => {
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      //   bgcolor="text.secondary"
      //   color="white"
      sx={{ flexGrow: 1 }}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-around"
        alignItems="stretch"
        textAlign="justify"
      >
        <Grid item xs={4}>
          <Grid container justifyContent="center"></Grid>
        </Grid>
        <Grid item xs={4}>
          <div>
            <div>
              <h1>Building Informatics</h1>
            </div>
            <div>
              <p>
                Welkom op onze site! Wij zijn Julien en Vadin en hebben voor het
                BV Building Informatics een enrichment-project gemaakt. Dit
                houdt in dat we een 3D-model gaan verrijken met informatie. Deze
                informatie neemt de vorm aan van datasets. Echter is het
                3D-model eveneens een soort dataset, namelijk een dataset die
                bv. geometry heet. Dit houdt in dat je makkelijk informatie kan
                linken aan het model via deze geometry. Het 3D-model is
                makkelijk toegankelijk waardoor het handig is om andere
                informatie te bekomen. Voor elk object in deze geometry wordt
                een concept aangemaakt dat verrijkt kan worden met andere files.
                We beperken ons in dit project tot pngs en jpegs. Als basis om
                dit te realiseren, hebben we een heleboel informatie en een
                3D-model gekregen van Willem Bekers over een project uit de
                tweede wereldoorlog in Brugge.
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};
export default About;
