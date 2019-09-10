import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { formatTimeDate } from '../../../lib/helpers'

class Home extends React.Component {
  constructor() {
    super()
    this.state= {
      crews: [],
      crewDataUpdated: ''
    }
    this.getRaceTimes = this.getRaceTimes.bind(this)
    this.getBROECrewData = this.getBROECrewData.bind(this)
    this.getCrewsWithTimes = this.getCrewsWithTimes.bind(this)
    this.getCrewsWithoutTimes = this.getCrewsWithoutTimes.bind(this)
  }

  componentDidMount() {
    axios.get('/api/crews')
      .then(res => this.setState({ crews: res.data}))
  }

  getBROECrewData(){

    Promise.all([
      axios.get('/api/club-data-import/'),
      axios.get('/api/event-data-import/'),
      axios.get('/api/crew-data-import/')
    ]).then(([res1, res2, res3]) => {
      console.log(res1.data, res2.data, res3.data)
    }).then(this.setState({ crewDataUpdated: Date.now(), isLoading: false }))
      .catch(error => {
        if (error.response) {
          console.log(error.responderEnd)
        }
      })
  }

  getRaceTimes(){
    axios.get('/api/crew-race-times')
      .then(res => console.log(res.data)
        .then(this.setState({ raceTimesDataUpdated: Date.now() }
        )))
  }

  getCrewsWithTimes(){
    const crewsWithTimes = this.state.crews.filter(crew => crew.times.length === 2)
    return crewsWithTimes.length
  }

  getCrewsWithoutTimes(){
    const crewsWithoutTimes = this.state.crews.filter(crew => crew.times.length !== 2)
    return crewsWithoutTimes.length
  }

  render() {
    console.log(this.state.crewDataUpdated)
    return (
      <section className="section">
        <div className="container">
          <div className="box">
            <h1 className="title has-text-centered">Pairs Head of the River Race Results (PHORRR)</h1>
          </div>
          <div className="columns">
            <div className="column">
              <button className="button is-primary" onClick={this.getBROECrewData}>Get Crew data</button>
              <p><small>{`Updated: ${formatTimeDate(this.state.crewDataUpdated)}` || 'No data'}</small></p>
            </div>
            <div className="column">
              <button className="button is-primary is-primary" onClick={this.getRaceTimes}>Get Taps data</button>
              <p><small>{`Updated: ${formatTimeDate(this.state.raceTimesDataUpdated)}` || 'No data'}</small></p>
            </div>
            <div className="column">
              <Link to="/race-times">
                <button className="button is-primary">
                  Fix Start Sequence
                </button>
              </Link>
            </div>
            <div className="column">
              <Link to="/race-times">
                <button className="button is-primary">
                Fix Finish Sequence
                </button>
              </Link>
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
