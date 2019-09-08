import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

class RaceTimeEdit extends React.Component {
  constructor() {
    super()
    this.state= {
      race_times: []
    }
  }

  componentDidMount() {
    axios.get(`/api/race-times/${this.props.match.params.id}`)
      .then(res => this.setState({ race_times: res.data}))
  }

  render() {

    console.log(this.state.race_times)

    return (
      <section className="section">
        <div className="container">
          <h1>RaceTime Edit</h1>
        </div>
      </section>
    )
  }
}

export default RaceTimeEdit
