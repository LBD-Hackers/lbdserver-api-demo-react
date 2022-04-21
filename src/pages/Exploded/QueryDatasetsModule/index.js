import React, { useEffect, useState, useContext } from "react";
import { Button, TextField, FormGroup, FormControlLabel, Checkbox, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useRecoilValue, useRecoilState } from "recoil";
import { datasets as d, project as p, selectedElements as s} from '../../../atoms'
import { translate } from "sparqlalgebrajs";
import {atom} from 'recoil'
import {QueryEngine} from '@comunica/query-sparql'
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";

const defaultQuery = `prefix beo: <https://pi.pauwel.be/voc/buildingelement#>
prefix dot: <https://w3id.org/dot#>
prefix bot: <https://w3id.org/bot#>
prefix dcat: <http://www.w3.org/ns/dcat#>
SELECT * WHERE {
          ?s <http://www.w3.org/2000/01/rdf-schema#label> "2tYn8GqBf2$xyxzGpM6RFy.gltf" ;
          dcat:distribution/dcat:downloadURL ?downloadUrl .
}`


const q = atom({
  key: 'query-module',
  default: defaultQuery
})

const QueryModule = ({queryEngine, onFindDownloadUrls}) => {
  // const store = useContext(StoreContext)

  const [datasets, setDatasets] = useState([])
  const [query, setQuery] = useRecoilState(q)
  const [error, setError] = useState("")
  const project = useRecoilValue(p)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDatasets() {
      try {
      const ds = await project.getAllDatasetUrls({queryEngine})
      console.log('ds', ds)
      setDatasets(ds)
      setLoading(false)        
      } catch (error) {
        setError(error)
      }

    }
    loadDatasets()
  }, [])

  async function doQuery() {
    setLoading(true)
    const results = await queryEngine.queryBindings(query, {sources: datasets, fetch: getDefaultSession().fetch})
    const bindings = await results.toArray()
    const arr = bindings.map(i => i.get('downloadUrl').value)
    console.log('arr', arr)
    setLoading(false)
    onFindDownloadUrls(arr)
  }
  
  return (
    <div style={{ margin: 20 }}>
      <h4 style={{ marginTop: -5 }}>Query Resource Metadata</h4>
      <p>Temporary fix: use ?downloadUrl as a variable!</p>
      <TextField
        id="outlined-multiline-flexible"
        label="Query SPARQL"
        fullWidth
        multiline
        minRows={4}
        maxRows={10}
        value={query}
        helperText={error}
        error={error ? true : false}
        onChange={e => setQuery(e.target.value)}
      />
      <Button disabled={loading} onClick={doQuery}>QUERY</Button>
    </div>
  );
};

export default QueryModule