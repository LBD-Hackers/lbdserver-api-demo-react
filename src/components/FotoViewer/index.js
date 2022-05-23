import { AGGREGATOR_ENDPOINT } from '../../constants';
import { extract, createReferences } from '../../util/functions';
import { DCAT, DCTERMS, LDP, RDFS } from '@inrupt/vocab-common-rdf'
import { useRecoilState, useRecoilValue } from 'recoil'
import { project as p, datasets as d, selectedElements as s} from "../../atoms"
import React, { useEffect, useState } from "react";

const FotoViewer = ({ parentNode }) => {
    const [model, setModel] = useState("")
    const [dataset, setDataset] = useState("")
    const [selectedElements, setSelectedElements] = useRecoilState(s)
    const [selection, setSelection] = useState([])
    const project = useRecoilValue(p)
    const datasets = useRecoilValue(d)
    const [imageUrls, setImageUrls] = useState([])
  
    useEffect(() => {
      setActiveDatasets()
    }, [datasets])
  
async function setActiveDatasets() {
      const allowedContentTypes=["image/jpeg","image/png"]
      const relevantDistributions=[]
      for (const ref of concept.references){
        const url = ref.distribution
        const mimetype =  await project.fetch(url,{method:"HEAD"}).then(i => i.headers.get("Content-Type"))
        if (allowedContentTypes.includes(mimetype)){
          relevantDistributions.push(url)
        }
      }
      
    setImageUrls(relevantDistributions)
     }   
     return(
       <div>
         {imageUrls.map(url => {
           return <img src={url}/>
         })}
       </div>
     )
  
  };
  
  export default FotoViewer;