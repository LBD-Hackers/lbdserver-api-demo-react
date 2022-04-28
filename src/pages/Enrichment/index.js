import React from 'react'
import Viewer from '../../components/Viewer'
import { useRecoilValue, useRecoilState } from "recoil";
import { datasets as d, project as p, selectedElements as s } from "../../atoms"
import { useState, useEffect } from 'react'
import { FormControl, Radio, FormLabel, RadioGroup, FormControlLabel, Button } from '@mui/material'
import { LbdDataset, LbdConcept } from 'lbdserver-client-api'
import { getDefaultSession, login, Session } from '@inrupt/solid-client-authn-browser';
import { extract } from "../../util/functions";
import { DCTERMS, LDP, RDFS } from '@inrupt/vocab-common-rdf'
import { v4 } from "uuid"
import CreateDataset from "../Documentation/Dialogs/CreateDataset"
import AlignDistributions from '../Documentation/Dialogs/AlignDistributions';

const index = () => {
  return (
    <div id="enrichmentViewer">
      <Viewer parentNode="enrichmentViewer"></Viewer>
      <CreateDataset />
     <Enricher /> 
      <AlignDistributions/>
    
    </div>
  )
}


const Enricher = () => {
  const [selectedElements, setSelectedElements] = useRecoilState(s)
  const project = useRecoilValue(p)
  const [datasets, setDatasets] = useState([])
  const [mainDataset, setMainDataset] = useState()
  const [error, setError] = useState("")

  useEffect(() => {
    getAllDatasets()
  }, [])

  async function getAllDatasets() {
    console.log('project', project)
    const allDatasets = await project.getAllDatasetUrls()
    const loaded = {}
    for (const ds of allDatasets) {
      const myDs = new LbdDataset(getDefaultSession(), ds)
      console.log('myDs', myDs)
      if (myDs.url.includes(project.localProject)) { // this is one of my datasets
        await myDs.init()
        loaded[ds] = { dataset: myDs, active: false }
      }
    }
    setDatasets(loaded)
  }

  function setDataSetToEnrich(ds) {
    setMainDataset(ds)
  }

 // only able to enrich one at the time

 async function enrich() {

  try {
   // const theDataset = await project.addDataset({ [RDFS.label]: label, [RDFS.comment]: comment }, eval(isPublic))
   // if (file) {
     //   await theDataset.addDistribution(file, undefined, {}, undefined, eval(isPublic))
  // }

      // <Button  variant="contained" component="span">
        //  Choose File
       // </Button>

    if (distr.length === 0) {

      throw Error("Dataset has no distributions")
    }
      if (selectedElements.length > 0) {
      const element = selectedElements[0]
      const c = new LbdConcept(getDefaultSession(), project.getReferenceRegistry())
      c.init(JSON.parse(JSON.stringify({ aliases: element.aliases, references: [...element.references, newRef] })))
      await c.addReference({
        dataset: mainDataset.url,
        distribution: distribution.url,
        identifier: distribution.url
      })
    }
  } catch (error) {
    console.log('error', error)
  }
}


  return <div>
    <h4>The enrichment module</h4>

    <FormControl >
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={mainDataset && mainDataset.url}
      >
        {Object.keys(datasets).map(ds => {
          return <DatasetInfo key={ds} dataset={datasets[ds]} toggle={setDataSetToEnrich} active={mainDataset && (datasets[ds].dataset.url === mainDataset.url)} />
        })}
      </RadioGroup>
      <Button onClick={async () => { await enrich() }} disabled={!mainDataset || selectedElements.length == 0}>Upload Image</Button>
    </FormControl>
  </div>
}

function DatasetInfo(props) {
  const { dataset } = props.dataset

  function makeLabel() {
    const label = extract(dataset.data, dataset.url)[RDFS.label][0]["@value"]
    const creator = extract(dataset.data, dataset.url)[DCTERMS.creator][0]["@id"]
    return `${label} - ${creator}`
  }

  return <FormControlLabel value={dataset.url} onChange={() => props.toggle(dataset)} control={<Radio checked={props.active} />} label={makeLabel()} />
}


export default index