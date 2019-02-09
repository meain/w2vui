import React, { useState } from 'react'

import axios from 'axios'

import {samples} from '../../constants.js'
import { getSimilarWords } from './utils.js'
import WordSet from '../WordSet'

import './Similarity.css'

const Similarity = ({ samples }) => {
  const [loading, setLoading] = useState(false)
  const [word, setWord] = useState(samples[0])
  const [apiResponse, setApiResponse] = useState({ similar: null, nonSimilar: null })

  const findSimilar = word => {
    setLoading(true)
    getSimilarWords(word)
      .then(res => setApiResponse(res))
      .catch(() => setApiResponse({ similar: null, nonSimilar: null }))
      .finally(() => setLoading(false))
  }
  const { similarWords, nonSimilarWords } = apiResponse

  return (
    <div className="Similarity">
      <form
        className="Similarity-input-wrapper"
        onSubmit={e => {
          e.preventDefault()
          findSimilar(e.target.elements.input.value)
        }}>
        <input
          id="input"
          className="Similarity-input"
          type="text"
          placeholder="Enter word..."
          value={word}
          onChange={e => setWord(e.target.value)}
        />
        <div className="loader" style={{ display: loading ? 'block' : 'none' }} />
      </form>
      <div className="Similarity-results">
        {similarWords && (
          <WordSet
            title={'SIMILAR'}
            color="positive"
            words={similarWords}
            onSelect={findSimilar}
          />
        )}
        {nonSimilarWords && (
          <WordSet
            title={'NOT SIMILAR'}
            color="negative"
            words={nonSimilarWords}
            onSelect={findSimilar}
          />
        )}
      </div>
    </div>
  )
}

export default Similarity
