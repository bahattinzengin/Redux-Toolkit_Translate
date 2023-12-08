import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from './../constants/index';



export const getLanguages= createAsyncThunk(
'translate/getLanguages',
async ()=>{

    const res =await axios.request(options);
    // console.log(res);
    
    return res.data.data.languages;
}


);

export const translateText = createAsyncThunk(
  'translate/text',
  async ({ sourceLang, targetLang, text }) => {
    // api isteğine gönderlicek parametreleri ayarlama
    const params = new URLSearchParams();
    params.set('source_language', sourceLang.value);
    params.set('target_language', targetLang.value);
    params.set('text', text);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '4c7546fd62msh2dcd6b97d20729ep1318ffjsn4939354ba15c',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data:params,
    };

    // yukarıdaki ayarlara göre api isteği atar
    const res = await axios.request(options);

    // cevabı slice'a aktar
    return res.data.data.translatedText;
  }
);