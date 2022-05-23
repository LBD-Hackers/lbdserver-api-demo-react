import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Alert } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { getDefaultSession, login, Session } from '@inrupt/solid-client-authn-browser';
import { useRecoilState, useRecoilValue } from 'recoil'
import { project as p } from "../../../atoms"
import { v4 } from "uuid"
import DialogTemplate from './DialogTemplate';
import { LbdProject, LbdService }  from "lbdserver-client-api"
import { AGGREGATOR_ENDPOINT } from '../../../constants';
import { extract } from '../../../util/functions';
import { DCTERMS, LDP, RDFS } from '@inrupt/vocab-common-rdf'

export default function uploadPicture(props) {
async function uploadPicture() {
    try {
        setLoading(true)
        const theDataset = await project.addDataset({ [RDFS.label]: label, [RDFS.comment]: comment }, eval(isPublic))
        if (file) {
            const theDistribution = await theDataset.addDistribution(file, undefined, {}, undefined, eval(isPublic))
        }
        setSuccess(true)
        setFile(null)
        setLoading(false)
    } catch (error) {
        setError(error)
        setFile(null)
        setLoading(false)
    }
}}