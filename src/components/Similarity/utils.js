import axios from 'axios'

const apiUrl = 'http://localhost:3000/similarity'
export const getSimilarWords = word => {
  console.log('word:', word)
  return new Promise((resolve, reject) => {
    console.log('wordw:', word)
    // .post(apiUrl, { word })
    axios
      .get(apiUrl)
      .then(res => {
        let similarWords = []
        let nonSimilarWords = []
        res.data.similar.forEach(s => {
          similarWords.push(s)
        })
        res.data.not_similar.forEach(s => {
          nonSimilarWords.push(s)
        })
        console.log('{similar, nonSimilarWords}:', { similarWords, nonSimilarWords })
        resolve({ similarWords, nonSimilarWords })
      })
      .catch(() => {
        console.log('Could not find word')
        reject()
      })
  })
}
