import React from 'react'
import axios from 'axios'
import { formatTimes } from '../../lib/helpers'

class ResultIndex extends React.Component {
  constructor() {
    super()
    this.state= {
      crews: [],
      crewsToDisplay: []
    }
  }

  componentDidMount() {
    axios.get('/api/crews/')
      .then(res => this.setState({ crews: res.data, crewsToDisplay: res.data}))
  }

  filterCrewsByTime() {
    const filteredCrews = this.state.crews.filter(crew => crew.raw_time !== null)
    this.setState({ crewsToDisplay: filteredCrews})
  }

  render() {

    console.log(this.state.crews)

    return (
      <section className="section">
        <div className="container">

          <table className="table">
            <thead>
              <tr>
                <td>Overall</td>
                <td>Crew ID</td>
                <td colSpan='2'>Club</td>
                <td>Crew</td>
                <td>Time</td>
                <td>Event</td>
                <td>Pos</td>
                <td>Penalty</td>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td>Overall</td>
                <td>Crew ID</td>
                <td colSpan='2'>Club</td>
                <td>Crew</td>
                <td>Time</td>
                <td>Event</td>
                <td>Pos</td>
                <td>Penalty</td>
              </tr>
            </tfoot>
            <tbody>
              {this.state.crewsToDisplay.map(crew =>
                <tr key={crew.id}>
                  <td>??</td>
                  <td>{crew.id}</td>
                  <td><img src={crew.club.blade_image} alt="blade image" width="40px" /></td>
                  <td>{crew.club.name}</td>
                  <td>{crew.name}</td>
                  <td>{formatTimes(crew.raw_time)}</td>
                  <td>{crew.event.name}</td>
                  <td>Pos</td>
                  <td>{crew.penalty ? 'P' : ''}</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </section>
    )
  }
}

export default ResultIndex
