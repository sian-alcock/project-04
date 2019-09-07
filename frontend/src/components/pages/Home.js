import React from 'react'
import axios from 'axios'

class Home extends React.Component {
  constructor() {
    super()
    this.state= {
      crews: []
    }
    this.getStartTimes = this.getStartTimes.bind(this)
    this.getCrewsWithTimes = this.getCrewsWithTimes.bind(this)
    this.getCrewsWithoutTimes = this.getCrewsWithoutTimes.bind(this)
  }

  componentDidMount() {
    axios.get('/api/crews')
      .then(res => this.setState({ crews: res.data}))
  }

  getStartTimes(){
    axios.get('/api/crew-start-times')
      .then(res => this.setState({ crews: res.data})
      )
  }

  getCrewsWithTimes(){
    // loop around the data set
    const crewsWithTimes = this.state.crews.filter(crew => crew.times.length === 2)
    //if the crew.times array includes 2 records
    return crewsWithTimes.length
    // and if one is start and one is finish_time
    // then the crew has both times
  }

  getCrewsWithoutTimes(){
    // loop around the data set
    const crewsWithoutTimes = this.state.crews.filter(crew => crew.times.length !== 2)
    //if the crew.times array includes 2 records
    return crewsWithoutTimes.length
    // and if one is start and one is finish_time
    // then the crew has both times
  }

  render() {
    console.log(this.state.crews)
    if(!this.state.crews) return <h2>Loading...</h2>
    return (
      <section className="section">
        <div className="container">
          <div className="box">
            <h1 className="title has-text-centered">Pairs Head of the River Race Results (PHORRR)</h1>
          </div>
          <div className="columns">
            <div className="column">
              <button className="button is-primary" onClick={this.getCrewData}>Get Crew data</button>
              <p><small>Updated: dd:mm:yyyy hh:mm:ss</small></p>
            </div>
            <div className="column">
              <button className="button is-primary is-primary" onClick={this.getStartTimes}>Get Taps data</button>
              <p><small>Updated: dd:mm:yyyy hh:mm:ss</small></p>
            </div>
            <div className="column">
              <button className="button is-primary">Fix Start Sequence</button>
            </div>
            <div className="column">
              <button className="button is-primary">Fix Finish Sequence</button>
            </div>
          </div>

          <div className="box">
            <h2 className="subtitle has-text-centered">Summary</h2>
          </div>


          <div className="columns">
            <div className="column">
              <p>Crews with times</p>
            </div>
            <div className="column">
              <p>{this.getCrewsWithTimes()}</p>
            </div>
            <div className="column">
            </div>
            <div className="column">
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <p>Crews without times</p>
            </div>
            <div className="column">
              <p>{this.getCrewsWithoutTimes()}</p>
            </div>
            <div className="column">
            </div>
            <div className="column">
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <p>Orphan times</p>
            </div>
            <div className="column">
              <p>??</p>
            </div>
            <div className="column">
            </div>
            <div className="column">
            </div>
          </div>

          <div className="box">
            <h2 className="subtitle has-text-centered">Prepare Results</h2>
          </div>

          <div className="columns">
            <div className="column">
              <button className="button is-primary">Results Overview</button>
            </div>
            <div className="column">
              <button className="button is-primary">Calculate Handicaps</button>
            </div>
            <div className="column">
              <button className="button is-primary">Publish to GoogleDrive</button>
            </div>
            <div className="column">
              <button className="button is-primary">Submit BROE Results</button>
            </div>
          </div>

        </div>
      </section>
    )
  }
}

export default Home
