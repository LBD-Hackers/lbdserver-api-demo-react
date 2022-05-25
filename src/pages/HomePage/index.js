import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const HomePage = () => {
  return (
    <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-around"
        alignItems="stretch"
        textAlign="justify"
      >
        <Grid item xs={4}>
          <div>
            <div>
              <h1>Beton in België 1890 - 2020</h1>
            </div>

            <div>
              Om de activiteiten van de Duitse militaire scheepswerven te
              beschermen tegen luchtbombardementen, werden, verspreid in de
              Brugse binnenhaven, schuilbunkers in gewapend beton opgetrokken
              voor personeel, zeemijnen en torpedo’s. Het sluitstuk van deze
              operatie was de bouw van een grote bomvrije betonnen schuilplaats
              voor de onderzeeërs zelf. Een ter plaatse gestort skelet van
              balken en kolommen, gefundeerd op houten palen, werd opgericht in
              het water. Het dak bestond uit geprefabriceerde U-vormige
              betonelementen, afgedekt met dubbelgewapend beton een elastische
              grindlaag en een impact laag in gewapend beton. De totale dikte
              van het dak bedroeg daardoor 120 cm. Invulling van het skelet met
              baksteen en uitkragende dakranden in ter plaatse gestort beton
              moesten het interieur bijkomend beschermen tegen splinterwerking
              door explosies in de onmiddellijke omgeving. Voor de realisatie
              van dit alles binnen een tijdsbestek van slechts enkele maanden,
              werd een betoncentrale met giettoren naast de werf gebouwd. Van
              hieruit kon het beton op het dak worden gebracht en via smal
              spoornet over de ganse bouwplaats worden verspreid. De betonnen
              dak elementen werden ter plaatse geprefabriceerd in een
              productielijn op de grond en vervolgens gepositioneerd op de reeds
              gestorte dakbalken via een ingenieus systeem van mobiele
              portaalkranen. De werken bleven door het einde van de oorlog
              onvoltooid: van de elf geplande dokken – elk ongeveer 8 bij 62 m –
              werden er uiteindelijk acht gerealiseerd. Het geavanceerde
              karakter van de betonstructuur en vooral de weldoordachte
              organisatie van de bouwwerf werden als exemplarisch bestempeld in
              diverse naoorlogse publicaties en in lezingen voor kringen van
              ingenieurs en architecten.
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          <Grid container justifyContent="center">
            <Box
              //   py={{ xs: 5, sm: 12 }}
              component="img"
              sx={{
                height: 730, 
                width: 978,
                maxHeight: { xs: 233, md: 365, lg: 639 },
                maxWidth: { xs: 350, md: 489, lg: 856 },
              }}
              alt="bunker home"
              src="http://localhost:5000/julien/images/home.jpg"
            />
          </Grid>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
