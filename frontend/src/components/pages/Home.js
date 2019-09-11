import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { formatTimeDate } from '../../lib/helpers'
// import { ButtonLoader } from '../common/ButtonLoader'

class Home extends React.Component {
  constructor() {
    super()
    this.state= {
      crews: [],
      crewsLoading: false,
      raceTimesLoading: false
    }
    this.getRaceTimes = this.getRaceTimes.bind(this)
    this.getBROECrewData = this.getBROECrewData.bind(this)
    this.getCrewsWithTimes = this.getCrewsWithTimes.bind(this)
    this.getCrewsWithoutTimes = this.getCrewsWithoutTimes.bind(this)
    this.getTotalCrews = this.getTotalCrews.bind(this)
    this.getScratchedCrewsWithTimes = this.getScratchedCrewsWithTimes.bind(this)
  }

  componentDidMount() {
    axios.get('/api/crews')
      .then(res => this.setState({ crews: res.data}))
  }

  getBROECrewData(){
    this.setState({ crewsLoading: true })
    //get clubs and events first, then get crews
    Promise.all([
      axios.get('/api/club-data-import/'),
      axios.get('/api/event-data-import/')
    ]).then(([res1, res2]) => {
      console.log(res1.data, res2.data)
    }).then(this.setState({ crewDataUpdated: Date.now(), crewsLoading: false }))
      .then(axios.get('/api/crew-data-import/')
        .then(res3 => console.log(res3.data)))
  }

  getRaceTimes(){
    this.setState({ loading: true })
    axios.get('/api/crew-race-times')
      .then(res => {
        console.log(res.data)
      })
      .then(this.setState({ raceTimesDataUpdated: Date.now(), loading: false }
      ))
  }

  getCrewsWithTimes(){
    const crewsWithTimes = this.state.crews.filter(crew => crew.status !== 'Scratched' && crew.times.length === 2)
    return crewsWithTimes.length
  }

  getCrewsWithoutTimes(){
    const crewsWithoutTimes = this.state.crews.filter(crew => crew.status !== 'Scratched' && crew.times.length !== 2)
    return crewsWithoutTimes.length
  }

  getScratchedCrewsWithTimes(){
    const scratchedCrewsWithTimes = this.state.crews.filter(crew => crew.status === 'Scratched' && crew.times.length === 2)
    return scratchedCrewsWithTimes.length
  }

  getTotalCrews(){
    return this.state.crews.length
  }

  getAcceptedCrews(){
    const acceptedCrews = this.state.crews.filter(crew => crew.status === 'Accepted')
    return acceptedCrews.length
  }

  getScratchedCrews(){
    const acceptedCrews = this.state.crews.filter(crew => crew.status === 'Scratched')
    return acceptedCrews.length
  }

  render() {

    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <button className="button is-primary" onClick={this.getBROECrewData} disabled={this.state.crewsLoading}>
                {this.state.crewsLoading ? 'Loading Crew Data' : 'Get Crew Data'}
              </button>
              <p><small>{`Updated: ${formatTimeDate(this.state.crewDataUpdated)}` || 'No data'}</small></p>
            </div>

            <div className="column has-text-centered">
              <button className="button is-primary" onClick={this.getRaceTimes} disabled={this.state.raceTimesLoading}>
                {this.state.raceTimesLoading ? 'Loading race times' : 'Get race times'}
              </button>
              <p><small>{`Updated: ${formatTimeDate(this.state.raceTimesDataUpdated)}` || 'No data'}</small></p>
            </div>
            <div className="column has-text-centered">
              <Link to="/race-times">
                <button className="button is-primary">
                  Fix Start Sequence
                </button>
              </Link>
            </div>
            <div className="column has-text-centered">
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


          <div className="columns is-centered">
            <div className="column">
              <p>Total crews</p>
            </div>
            <div className="column">
              <p>{this.getTotalCrews()}</p>
            </div>
            <div className="column">
              <p>Crews with times</p>
            </div>
            <div className="column">
              <p>{this.getCrewsWithTimes()}</p>
            </div>
          </div>

          <div className="columns is-centered">
            <div className="column">
              <p>Accepted crews</p>
            </div>
            <div className="column">
              <p>{this.getAcceptedCrews()}</p>
            </div>
            <div className="column">
              <p>Crews without times</p>
            </div>
            <div className="column">
              <p>{this.getCrewsWithoutTimes()}</p>
            </div>
          </div>

          <div className="columns is-centered">
            <div className="column">
              <p>Scratched crews</p>
            </div>
            <div className="column">
              <p>{this.getScratchedCrews()}</p>
            </div>
            <div className="column">
              <p>Scratched crews that have a time</p>
            </div>
            <div className="column">
              <p>{this.getScratchedCrewsWithTimes()}</p>
            </div>
          </div>

          <div className="box">
            <h2 className="subtitle has-text-centered">Prepare Results</h2>
          </div>

          <div className="columns">
            <div className="column has-text-centered">
              <button className="button is-primary">Results Overview</button>
            </div>
            <div className="column has-text-centered">
              <button className="button is-primary">Calculate Handicaps</button>
            </div>
            <div className="column has-text-centered">
              <button className="button is-primary">Publish to GoogleDrive</button>
            </div>
            <div className="column has-text-centered">
              <button className="button is-primary">Submit BROE Results</button>
            </div>
          </div>

        </div>
      </section>
    )
  }
}

export default Home
