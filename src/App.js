import './App.css'

import React, { Component } from 'react'

import Operator from './components/Operator'
import WordSet from './components/WordSet'

import axios from 'axios'

import {languageStrings, samples, operationSamples} from './constants.js'

const ip = '35.184.138.74:5555'

class App extends Component {
  constructor(props: Props) {
    super(props)
    const url = new URL(window.location)
    const supportedLanguages = [ 'ta', 'ml', 'bl']
    let lang = url.searchParams.get('lang')
    lang = lang && supportedLanguages.includes(lang) ? lang : 'ml'

    this.state = {
      languageStrings,
      language: lang,
      word: '',
      similarWords: null,
      nonSimilarWords: null,
      samples,
      operations: operationSamples,
      result: null,
    }

    let self: any = this // eslint-disable-line self.remove = self.remove.bind(this)
    self.onSubmit = self.onSubmit.bind(this)
    self.switchSign = self.switchSign.bind(this)
    self.addOperator = self.addOperator.bind(this)
    self.findSimilar = self.findSimilar.bind(this)
    self.sendOperation = self.sendOperation.bind(this)
    self.setLanguage = self.setLanguage.bind(this)
  }

  sendOperation() {
    let { operations, language } = this.state
    let positive = []
    let negative = []
    operations[language].forEach(o => {
      if (o.word.trim().length > 0) {
        if (o.sign === '+') positive.push(o.word)
        else if (o.sign === '-') negative.push(o.word)
      }
    })
    axios
      .post(`http://${ip}/compare/${language}/`, { positive, negative })
      .then(res => {
        let result = []
        res.data.forEach(r => {
          result.push(r[0])
        })
        this.setState({ ...this.state, result })
      })
      .catch(err => {
        this.setState({ ...this.state, result: null })
      })
  }

  findSimilar(word) {
    const { language } = this.state
    this.setState({ ...this.state, word, loading: true })
    axios
      .post(`http://${ip}/similar/${language}/`, { word })
      .then(res => {
        let similarWords = []
        let nonSimilarWords = []
        res.data.similar.forEach(s => {
          similarWords.push(s[0])
        })
        res.data.not_similar.forEach(s => {
          nonSimilarWords.push(s[0])
        })
        this.setState({ ...this.state, similarWords, nonSimilarWords, loading: false })
      })
      .catch(() => {
        console.log('Could not find word')
        this.setState({ ...this.state, loading: false })
      })
  }

  onSubmit(event) {
    event.preventDefault()
    const word = event.target.elements.input.value
    this.findSimilar(word)
  }

  switchSign(i) {
    let { operations } = this.state
    operations[i].sign = operations[i].sign === '+' ? '-' : '+'
    this.setState({ ...this.state, operations })
  }

  remove(i) {
    let { operations } = this.state
    operations.splice(i, 1)
    this.setState({ ...this.state, operations })
  }

  addOperator() {
    let { operations } = this.state
    operations.push({ word: '', sign: '+' })
    this.setState({ ...this.state, operations })
  }

  wordChagne(i, word) {
    let { operations } = this.state
    operations[i].word = word
    this.setState({ ...this.state, operations })
  }

  setLanguage(language) {
    this.setState({ ...this.state, language, similarWords: null, nonSimilarWords: null, word: '' })
  }

  render() {
    const {
      word,
      similarWords,
      nonSimilarWords,
      samples,
      operations,
      loading,
      result,
      language,
      languageStrings,
    } = this.state
    const languageSamples = samples[language]
    return (
      <div className="App">
        <div className="top header">
          <h1>W2V {languageStrings[language]}</h1>
          <div className="language-switcher">
            <div
              className={`language ${language === 'ml' ? 'active' : ''}`}
              onClick={() => this.setLanguage('ml')}>
              {languageStrings.ml}
            </div>
            <div
              className={`language ${language === 'ta' ? 'active' : ''}`}
              onClick={() => this.setLanguage('ta')}>
              {languageStrings.ta}
            </div>
            <div
              className={`language ${language === 'bl' ? 'active' : ''}`}
              onClick={() => this.setLanguage('bl')}>
              {languageStrings.bl}
            </div>
          </div>
        </div>

        <div className="block-wrapper">
          <div className="block similarity">
            <h2>Similarity search</h2>
            <form className="input-wrapper" onSubmit={this.onSubmit}>
              <input
                id="input"
                type="text"
                placeholder="Enter word..."
                value={word}
                onChange={e => {
                  this.setState({ ...this.state, word: e.target.value })
                }}
              />
              <div className="loader" style={{ display: loading ? 'block' : 'none' }} />
            </form>
            <div className="samples">
              {languageSamples.map(s => (
                <span className="word" key={s} onClick={() => this.findSimilar(s)}>
                  {s}
                </span>
              ))}
            </div>
            <div className="word-sets">
              {similarWords && (
                <WordSet
                  title={'SIMILAR'}
                  color="positive"
                  words={similarWords}
                  onSelect={this.findSimilar}
                />
              )}
              {nonSimilarWords && (
                <WordSet
                  title={'NOT SIMILAR'}
                  color="negative"
                  words={nonSimilarWords}
                  onSelect={this.findSimilar}
                />
              )}
            </div>
          </div>
        </div>

        {operations[language] && (
          <div className="block-wrapper">
            <div className="block algebra">
              <h2>Word2Vec algebra</h2>
              <div className="operations">
                {operations[language].map((o, i) => (
                  <Operator
                    key={i}
                    word={o.word}
                    sign={o.sign}
                    onChange={word => this.wordChagne(i, word)}
                    switchSign={() => this.switchSign(i)}
                    remove={() => this.remove(i)}
                  />
                ))}
              </div>
              {result && (
                <WordSet
                  title={'RESULT'}
                  color="positive"
                  words={result}
                  onSelect={this.findSimilar}
                />
              )}
              <div className="abuttons">
                <button className="abutton add-new" onClick={this.addOperator}>
                  + Add operation
                </button>
                <button className="abutton" onClick={this.sendOperation}>
                  Send >
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
