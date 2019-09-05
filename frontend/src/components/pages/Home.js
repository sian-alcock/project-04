import React from 'react'
import axios from 'axios'

class Home extends React.Component {
  constructor() {
    super()

    this.getStartTimes = this.getStartTimes.bind(this)
  }

  getStartTimes(){
    axios.get('/api/crews')
      .then(res => console.log(res.data)
      )
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1>Home</h1>
          <button className="button" onClick={this.getStartTimes}>Get start times</button>
          <button className="button" onClick={this.getFinishTimes}>Get finish times</button>
        </div>
      </section>
    )
  }
}

export default Home
