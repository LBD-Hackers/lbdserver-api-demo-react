import React from "react";
import Viewer from "../../components/Viewer";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  datasets as d,
  project as p,
  selectedElements as s,
} from "../../atoms";
import { useState, useEffect } from "react";
import {
  FormControl,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { LbdDataset, LbdConcept } from "lbdserver-client-api";
import {
  getDefaultSession,
  login,
  Session,
} from "@inrupt/solid-client-authn-browser";
import { extract } from "../../util/functions";
import { DCTERMS, LDP, RDFS } from "@inrupt/vocab-common-rdf";
import { v4 } from "uuid";
import CreateDataset from "../Documentation/Dialogs/CreateDataset";
import GetAllDatasets from "../Documentation/Dialogs/GetAllDatasets";
import EnrichtmentFunction from "../../components/EnrichtmentFunction";
import { styled } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
import { Grid } from "@mui/material";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import GetProjects from "../Documentation/Dialogs/GetProjects";
// import EnrichtmentFunction from "../../components/EnrichtmentFunction";
import FotoViewer from "../../components/FotoViewer";

const Input = styled("input")({
  display: "none",
});

const GridTest = () => {
  return (
    <div>
      <Box
        px={{ xs: 3, sm: 0 }}
        py={{ xs: 5, sm: 3 }}
        // bgcolor="text.primary"
        // color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <div style={subComponentStyle}>
                <GetProjects
                  style={subComponentStyle}
                  title={"Get available projects for this aggregator"}
                />
              </div>
              <div style={subComponentStyle}>
                <GetAllDatasets
                  style={subComponentStyle}
                  title={"Activate Datasets of this project"}
                />
              </div>
              <div style={subComponentStyle}>
                <Enricher />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div style={viewerStyle}>
                <Viewer />
              </div>
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <div style={subComponentStyle}>
                <FotoViewer/>
              </div>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};
const viewerStyle = {
  marginTop: 30,
  border: "2px solid gray",
  borderRadius: 15,
  // padding: 15,
};
const subComponentStyle = {
  marginTop: 30,
  // border: "2px solid gray",
  // borderRadius: 15,
  // padding: 15,
};

const Enricher = () => {
  const [selectedElements, setSelectedElements] = useRecoilState(s);
  const project = useRecoilValue(p);
  const [datasets, setDatasets] = useRecoilState(d);
  const [mainDataset, setMainDataset] = useState();
  const [error, setError] = useState("");
  const [label, setLabel] = useState("label");
  const [comment, setComment] = useState("comment");
  const [isPublic, setIsPublic] = useState("undefined");
  const [file, setFile] = useState(null);

  async function enrich() {
    try {
      const theDataset = await project.addDataset(
        { [RDFS.label]: label, [RDFS.comment]: comment },
        eval(isPublic)
      );
      let theDistribution;
      if (file) {
        theDistribution = await theDataset.addDistribution(
          file,
          undefined,
          {},
          undefined,
          eval(isPublic)
        );
        console.log(theDistribution);
        setDatasets((p) => {
          return {
            ...p,
            [theDataset.url]: { dataset: theDataset, active: true },
          };
        });
        setMainDataset(theDataset);
        // if (distr.length === 0) {
        //   throw Error("Dataset has no distributions")
        // }
        if (selectedElements.length > 0) {
          const element = selectedElements[0];
          const c = new LbdConcept(
            getDefaultSession(),
            project.getReferenceRegistry()
          );
          c.init(
            JSON.parse(
              JSON.stringify({
                aliases: element.aliases,
                references: [...element.references],
              })
            )
          );

          await c.addReference(
            theDistribution.url,
            theDataset.url,
            theDistribution.url
          );
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <h4>The enrichment module</h4>

      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={mainDataset && mainDataset.url}
        ></RadioGroup>
        <label
          style={{ margin: 10, width: "200" }}
          htmlFor="contained-button-file"
        >
          <Input
            onChange={(e) => setFile(e.target.files[0])}
            id="contained-button-file"
            type="file"
          />
          <Button color="inherit" variant="contained" component="span">
            Choose File
          </Button>
        </label>
        <Button
          onClick={async () => {
            await enrich();
          }}
          disabled={selectedElements.length == 0}
        >
          Enrich
        </Button>
      </FormControl>
    </div>
  );
};

export default GridTest;
