import React, { useEffect, useState } from 'react'
import ExplodedViewer from './ExplodedViewer'
import { useRecoilValue, useRecoilState } from "recoil";
import { datasets as d, project as p, selectedElements as s } from "../../atoms"
import { FormControl, Radio, FormLabel, RadioGroup, FormControlLabel, Button, Grid, Typography, TextField, Box, Switch } from '@mui/material'
import { LbdDataset, LbdConcept } from 'lbdserver-client-api'
import { getDefaultSession, login, Session } from '@inrupt/solid-client-authn-browser';
import { extract } from "../../util/functions";
import { DCTERMS, LDP, RDFS } from '@inrupt/vocab-common-rdf'
import { v4 } from "uuid"
import GetProjects from '../Documentation/Dialogs/GetProjects';
import GetAllDatasets from '../Documentation/Dialogs/GetAllDatasets'
import QueryModule from './QueryModule'
import QueryDatasetsModule from './QueryDatasetsModule'
import { QueryEngine } from '@comunica/query-sparql'

const index = () => {
  const [selectedElements, setSelectedElements] = useRecoilState(s)
  const [project, setProject] = useRecoilState(p)
  const [queryEngine, setQueryEngine] = useState(new QueryEngine())
  const [models, setModels] = useState([])
  const [onlyDatasets, setOnlyDatasets] = useState(true)

  useEffect(() => {
    setActiveDatasets()
  }, [selectedElements])

  async function setActiveDatasets() {
    const active = selectedElements.map(concept => concept.references).flat().map(item => item.distribution)
    const m = []
    const fetched = []
    console.log('active', active)
    for (const url of active) {
      if (!fetched.includes(url)) {
        const ct = await getDefaultSession().fetch(url, { method: "HEAD" }).then(res => res.headers.get('Content-Type'))
        fetched.push(url)
        if (ct === "model/gltf+json") {
          m.push(url)
        }
      }
    }
    console.log('m', m)
    setModels(m)
  }

  function onFindDownloadUrls(urls) {
    console.log('urls', urls)
    setModels(urls)
  }

  return (
    <div >
      <Grid textAlign="center" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4} sm={4} md={4}>
          <div style={{ overflow: 'auto' }}>
            <GetProjects />
            {(project) ? (
              <div>
                <Switch label='Query only metadata' checked={onlyDatasets} onChange={() => setOnlyDatasets(!onlyDatasets)} />
                {(onlyDatasets) ? (
                  <QueryDatasetsModule queryEngine={queryEngine} onFindDownloadUrls={onFindDownloadUrls} />
                ) : (
                  <div>
                    <SemanticDataset />

                    <QueryModule />
                  </div>
                )}
              </div>
            ) : (
              <p>Select a project first</p>
            )}

          </div>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <ExplodedViewer models={models} />
        </Grid>
      </Grid>
    </div>
  )
}


const SemanticDataset = () => {
  const [datasetUrl, setDatasetUrl] = useState("http://localhost:5000/office2/lbd/caadchair/local/datasets/0549ab7e-a6d1-431c-94c2-a4543d0e4047/")
  const [datasets, setDatasets] = useRecoilState(d)
  async function setDataset(e) {
    const loaded = {}
    const myDs = new LbdDataset(getDefaultSession(), datasetUrl)
    await myDs.init()
    loaded[datasetUrl] = { dataset: myDs, active: true }
    setDatasets(loaded)
    console.log("activated")
  }

  return <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={datasetUrl} onChange={setDatasetUrl} />
    <Button onClick={setDataset}>Activate</Button>
  </Box>
}

export default index