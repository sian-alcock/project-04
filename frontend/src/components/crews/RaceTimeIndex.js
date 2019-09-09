import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class RaceTimeIndex extends React.Component {
  constructor() {
    super()
    this.state= {
      race_times: []
    }
  }

  componentDidMount() {
    axios.get('/api/race-times/')
      .then(res => this.setState({ race_times: res.data}))
  }

  render() {

    console.log(this.state.race_times)

    return (
      <section className="section">
        <div className="container">
          <h1>RaceTime Index</h1>

          <table className="table">
            <thead>
              <tr>
                <th>Crew ID</th>
                <th>Crew name</th>
                <th>Sequence</th>
                <th>Bib number</th>
                <th>Start / Finish Tap</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Crew ID</th>
                <th>Crew name</th>
                <th>Sequence</th>
                <th>Bib number</th>
                <th>Start / Finish Tap</th>
              </tr>
            </tfoot>
            <tbody>
              {this.state.race_times.map(raceTime =>
                <tr key={raceTime.id}>
                  <td><Link to={`/race_time/${raceTime.crew}`}>{raceTime.crew}</Link></td>
                  <td>{raceTime.name}</td>
                  <td>{raceTime.sequence}</td>
                  <td>{raceTime.bib_number}</td>
                  <td>{raceTime.time_tap}</td>

                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    )
  }
}

export default RaceTimeIndex
