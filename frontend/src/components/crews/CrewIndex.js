import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class CrewIndex extends React.Component {
  constructor() {
    super()
    this.state= {
      crews: []
    }
  }

  componentDidMount() {
    axios.get('/api/crews/')
      .then(res => this.setState({ crews: res.data}))
  }

  render() {

    console.log(this.state.crews)

    return (
      <section className="section">
        <div className="container">
          <h1>Crew Index</h1>

          <table className="table">
            <thead>
              <tr>
                <th>Crew</th>
                <th>Crew ID</th>
                <th><abbr title="Composite code">Code</abbr></th>
                <th>Club</th>
                <th><abbr title="Penalty">P</abbr></th>
                <th><abbr title="Handicap">H</abbr></th>
                <th>Event</th>
                <th>Start sequence</th>
                <th>Start time</th>
                <th>Finish sequence</th>
                <th>Finish time</th>
                <th>Race time</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Crew</th>
                <th>Crew ID</th>
                <th><abbr title="Composite code">Code</abbr></th>
                <th>Club</th>
                <th><abbr title="Penalty">P</abbr></th>
                <th><abbr title="Handicap">H</abbr></th>
                <th>Event</th>
                <th>Start sequence</th>
                <th>Start time</th>
                <th>Finish sequence</th>
                <th>Finish time</th>
                <th>Race time</th>
              </tr>
            </tfoot>
            <tbody>
              {this.state.crews.map(crew =>
                <tr key={crew.id}>
                  <td><Link to={`/crews/${crew.id}`}>{crew.name}</Link></td>
                  <td>{crew.id}</td>
                  <td>{crew.composite_code}</td>
                  <td>{crew.club_id}</td>
                  <td>{crew.penalty}</td>
                  <td>{crew.handicap}</td>
                  <td>{crew.event_id}</td>
                  <td>startseq</td>
                  <td>starttime</td>
                  <td>finishseq</td>
                  <td>finishtime</td>
                  <td>Race time</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </section>
    )
  }
}

export default CrewIndex
