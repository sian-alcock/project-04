import React from 'react'
import axios from 'axios'
import { formatTimes } from '../../lib/helpers'
import Img from 'react-image'

class ResultIndex extends React.Component {
  constructor() {
    super()
    this.state= {
      crews: []
    }
    this.getCrewsToDisplay = this.getCrewsToDisplay.bind(this)
  }

  componentDidMount() {
    axios.get('/api/crews/')
      .then(res => this.setState({ crews: res.data }))
  }

  getCrewsToDisplay() {
    const filteredCrews = this.state.crews.filter(crew => crew.raw_time !== null)
    const crewsToDisplay = filteredCrews.sort((a, b) => (a.race_time > b.race_time) ? 1 : -1)
    console.log('crewstodisplay', crewsToDisplay)
    return crewsToDisplay
  }

  getImage() {
    <Img
      src={['https://www.example.com/foo.jpg', '../../assets/unknown_blades.png']}
    />
  }

  render() {

    return (
      <section className="section">
        <div className="container">

          <table className="table">
            <thead>
              <tr>
                <td>Overall</td>
                <td>Crew ID</td>
                <td colSpan='2'>Rowing club</td>
                <td>Crew</td>
                <td>Time</td>
                <td>Event</td>
                <td>Penalty</td>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td>Overall</td>
                <td>Crew ID</td>
                <td colSpan='2'>Rowing club</td>
                <td>Crew</td>
                <td>Time</td>
                <td>Event</td>
                <td>Penalty</td>
              </tr>
            </tfoot>
            <tbody>
              {this.getCrewsToDisplay().map((crew, i) =>
                <tr key={crew.id}>
                  <td>{i += 1}</td>
                  <td>{crew.id}</td>
                  <td><img className="blades" src={crew.club.blade_image} alt="blade image" width="40px" /></td>
                  <td>{crew.club.name}</td>
                  <td>{crew.name}</td>
                  <td>{formatTimes(crew.race_time)}</td>
                  <td>{crew.event.name}</td>
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
