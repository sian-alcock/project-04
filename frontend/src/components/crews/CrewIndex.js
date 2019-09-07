import React from 'react'
import axios from 'axios'

class CrewIndex extends React.Component {
  constructor() {
    super()

  }

  componentDidMount() {
    axios.get('/api/crews/')
      .then(res => console.log(res.data))
  }

  render() {
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
                <th><abbr title="Rowing CRI">R-CRI</abbr></th>
                <th><abbr title="Rowing CRI Max">R-CRI-Max</abbr></th>
                <th><abbr title="Sculling CRI">S-CRI</abbr></th>
                <th><abbr title="Sculling CRI Max">S-CRI-Max</abbr></th>
                <th>Status</th>
                <th><abbr title="Penalty">P</abbr></th>
                <th><abbr title="Handicap">H</abbr></th>
                <th><abbr title="Overall time">Time</abbr></th>
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
                <th><abbr title="Rowing CRI">R-CRI</abbr></th>
                <th><abbr title="Rowing CRI Max">R-CRI-Max</abbr></th>
                <th><abbr title="Sculling CRI">S-CRI</abbr></th>
                <th><abbr title="Sculling CRI Max">S-CRI-Max</abbr></th>
                <th>Status</th>
                <th><abbr title="Penalty">P</abbr></th>
                <th><abbr title="Handicap">H</abbr></th>
                <th><abbr title="Overall time">Time</abbr></th>
                <th>Event</th>
                <th>Start sequence</th>
                <th>Start time</th>
                <th>Finish sequence</th>
                <th>Finish time</th>
                <th>Race time</th>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <td>Crew</td>
                <td>Crew ID</td>
                <td><abbr title="Composite code">Code</abbr></td>
                <td>Club</td>
                <td><abbr title="Rowing CRI">R-CRI</abbr></td>
                <td><abbr title="Rowing CRI Max">R-CRI-Max</abbr></td>
                <td><abbr title="Sculling CRI">S-CRI</abbr></td>
                <td><abbr title="Sculling CRI Max">S-CRI-Max</abbr></td>
                <td>Status</td>
                <td><abbr title="Penalty">P</abbr></td>
                <td><abbr title="Handicap">H</abbr></td>
                <td><abbr title="Overall time">Time</abbr></td>
                <td>Event</td>
                <td>Start sequence</td>
                <td>Start time</td>
                <td>Finish sequence</td>
                <td>Finish time</td>
                <td>Race time</td>
              </tr>
            </tbody>
          </table>

        </div>
      </section>
    )
  }
}

export default CrewIndex
