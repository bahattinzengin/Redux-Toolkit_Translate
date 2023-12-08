import './style.scss'
import React, { useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { getLanguages, translateText } from './redux/translateActions';
import { setTranslated } from './redux/translateSlice';


const App = () => {
  const state = useSelector((store) => store.translate)
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState({
    label: 'Turkish',
    value: 'tr',

  });
  const [targetLang, setTargetLang] = useState({
    label: 'English',
    value: 'en',

  });





  useEffect(() => {

  
      dispatch(getLanguages());
    },[]);

  



  
  const refinedData = useMemo(
    () =>
      state.languages.map((lang) => ({
        label: lang.name,
        value: lang.code,
      })),
    [state.languages]
  );

  
  const handleSwap = () => {

    setTargetLang(sourceLang);
    setSourceLang(targetLang);
    setText(state.translatedText);
    dispatch(setTranslated(text));

  }






  return (
    <div id='main-page'>

      <div className='container' >
        <h1>Çeviri+</h1>


        {/* üst kısım */}
        <div className='upper'>

          <Select

          onChange={setSourceLang}

            className='select'
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            options={refinedData}
            value={sourceLang}

          />

          <button onClick={handleSwap}> Değiş </button>

          <Select
          onChange={setTargetLang}

            className='select'
          isLoading={state.isLangLoading}
          isDisabled={state.isLangLoading}
          options={refinedData}
          value={targetLang}

          />



        </div>



        {/* orta kısım */}
        <div className='middle'>
          <div>
            <textarea
            value={text} 
            onChange={(e)=>setText(e.target.value)}
            />
          </div>
          <div>

            {state.isTranslateLoading && (

              <ul className='wave-menu'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>

              </ul>
            )}


            <textarea
              value={state.translatedText} 
              disabled
            />

          </div>


        </div>






        {/*Alt kısım */}
        <button
        onClick={()=>
        dispatch(translateText({sourceLang,targetLang,text}))
        }
        >çevir</button>


      </div>
    </div>
  )
}

export default App