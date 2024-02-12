import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios, * as others from 'axios';

//const axios = require('axios')

export const GetPrompt = (prompt) =>
    axios.get("http://0.0.0.0:8000/GivePrompt/" + prompt, {responseType: 'json'})
    .then((response) => {console.log(response.data)
    return response.data})


export const GetResults = (cat, bud) =>
    axios.get("http://0.0.0.0:8000/GM/" + cat + '/' + bud, {responseType: 'json'})
    .then((response) => {console.log(response.data)})