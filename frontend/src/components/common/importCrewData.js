import React, { Component } from 'react'
import axios from 'axios'
import { formatTimeDate } from '../../lib/helpers'

class CrewLoader extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      crewDataUpdated: ''
    }

    // this.fetchData = this.fetchData.bind(this)
    // this.getBROECrewData = this.getBROECrewData.bind(this)
    this.getData = this.getData.bind(this)
    // this.getBROEClubAndEventData = this.getBROEClubAndEventData.bind(this)
  }

  async getData() {

    this.setState({ loading: true })

    try {

      const clubsPromise = axios.get('/api/club-data-import/')
      const eventsPromise = axios.get('/api/event-data-import/')
      const [clubs, events] = await Promise.all([clubsPromise, eventsPromise])
      console.log(clubs.data, events.data)

      // wait for first two calls before running the crew import
      const crews = await axios.get('/api/crew-data-import/')
      console.log(crews.data)

      this.setState({ crewDataUpdated: Date.now(), loading: false })

    } catch (e) {
      console.error(e)
    }
  }

  // getBROECrewData(){
  //   this.setState({ loading: true })
  //   //get clubs and events first, then get crews
  //   Promise.all([
  //     axios.get('/api/club-data-import/'),
  //     axios.get('/api/event-data-import/')
  //   ]).then(([res1, res2]) => {
  //     console.log(res1.data, res2.data)
  //   }).then(axios.get('/api/crew-data-import/')
  //     .then(res3 => console.log(res3.data))
  //     .then(this.setState({ crewDataUpdated: Date.now(), loading: false })))
  // }

  render() {
    const { loading } = this.state

    return (
      <div>
        <button className="button is-primary" onClick={this.getData} disabled={loading}>

          {loading && <span className="spinner"><i
            className="fas fa-spinner fa-spin"
          /> Loading ...</span>}
          {!loading && <span>Get Crew data</span>}

        </button>
        <p><small>{!this.state.crewDataUpdated ? '' : `Updated: ${formatTimeDate(this.state.crewDataUpdated)}`}</small></p>
      </div>
    )
  }
}

export default CrewLoader
