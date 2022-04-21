import React, { useState, useEffect } from "react";
import Viewer from "./Viewer";
import { AGGREGATOR_ENDPOINT } from '../../../constants';
import { extract, createReferences } from '../../../util/functions';
import { DCAT, DCTERMS, LDP, RDFS } from '@inrupt/vocab-common-rdf'
import { useRecoilState, useRecoilValue } from 'recoil'
import { project as p, datasets as d, selectedElements as s} from "../../../atoms"
import {getDefaultSession} from '@inrupt/solid-client-authn-browser'

const LBDviewer = ({models}) => {
  const [selection, setSelection] = useState([])



  // useEffect(() => {
  //   const {model: distribution} = setActiveDatasets()
  //   const filtered = []
  //   selectedElements.forEach(item => {
  //     item.references.forEach(ref => {
  //       if (ref.distribution == distribution) {
  //         filtered.push(ref.identifier)
  //       }
  //     })
  //   })
  //   setSelection(prev => filtered)
  // }, [selectedElements])

  // async function onSelect(sel) {
  //   setSelectedElements(prev => [])
  //   for (const s of sel) {
  //     const concept = await project.getConceptByIdentifier(s, dataset, model)
  //     console.log('concept', concept)
  //     if (concept) {
  //       setSelectedElements(prev => [...prev, concept])
  //     }
  //   }
  //   setSelection(sel)
  // }

  return (
    <div>
      {models.length > 0 ? (
        <div>
        <Viewer
          height={1300}
          models={models}
          projection={"perspective"}
          onSelect={console.log}
          selection={selection}
        />
        </div>
      ) : (
        <div>
          <p style={{ paddingTop: "10%" }}>No glTF models selected </p>
        </div>
      )}
    </div>
  );
};

export default LBDviewer;
