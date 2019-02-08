import './App.css'

import React, { Component } from 'react'

import Operator from './components/Operator'
import WordSet from './components/WordSet'

class App extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      operations: [{ word: 'bellybutton', sign: '+' }],
    }
    let self: any = this // eslint-disable-line
    self.remove = self.remove.bind(this)
    self.switchSign = self.switchSign.bind(this)
    self.addOperator = self.addOperator.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    const value = event.target.elements.input.value
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

  render() {
    const words = ['hello', 'yello', 'mellow', 'hella', 'bodacious']
    const samples = ['hello', 'yello', 'mellow', 'hella', 'bodacious']
    const { operations } = this.state
    return (
      <div className="App">
        <div className="header">
          <h1>W2V മലയാളം</h1>
        </div>
        <div className="block similarity">
          <h5>Similarity search</h5>
          <form className="input-wrapper" onSubmit={this.onSubmit}>
            <input id="input" type="text" placeholder="Enter word" />
          </form>
          <div className="samples">
            {samples.map(s => (
              <span className="word" key={s}>
                {s}
              </span>
            ))}
          </div>
          <div className="word-sets">
            <WordSet title={'SIMILAR'} color="positive" words={words} />
            <WordSet title={'NOT SIMILAR'} color="negative" words={words} />
          </div>
        </div>

        <div className="block algebra">
          <h5>Word2Vec algebra</h5>
          <div className="operations">
            {operations.map((o, i) => (
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
          <button className="add-new" onClick={this.addOperator}>
            Add new operation
          </button>
        </div>
      </div>
    )
  }
}

export default App
