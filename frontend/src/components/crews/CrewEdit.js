import React from 'react'
import axios from 'axios'
import Select from 'react-select'

// import { formatTimes } from '../../../lib/helpers'

class CrewEdit extends React.Component {
  constructor() {
    super()
    this.state= {
      formData: {},
      errors: {},
      allClubs: {},
      allEvents: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.getClubs = this.getClubs.bind(this)
    this.getEvents = this.getEvents.bind(this)

  }

  componentDidMount() {
    Promise.all([
      axios.get(`/api/crews/${this.props.match.params.id}`), // i.e. axios.get(something)
      axios.get('/api/clubs/'),
      axios.get('/api/events/')
    ]).then(([res1, res2, res3]) => {
      // console.log(res1.data, res2.data)
      this.setState({formData: res1.data, allClubs: res2.data, allEvents: res3.data})
    }).catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.put(`/api/crews/${this.props.match.params.id}`, this.state.formData)
      .then(() => this.props.history.push(`/crews/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  getClubs(){
    const clubsArray = Array.from(this.state.allClubs).map(club => club.name)
    const clubs = clubsArray.map(club => ({value: club, label: club}))
    return clubs
  }

  getEvents(){
    const eventsArray = Array.from(this.state.allEvents).map(event => event.name)
    const events = eventsArray.map(event => ({value: event, label: event}))
    return events
  }


  render() {

    console.log(this.state.formData)

    return (
      <section className="section">
        <div className="container">
          <form className="container box tableBorder" onSubmit={this.handleSubmit}>

            <div className="field">
              <label className="label" htmlFor="name">Crew name</label>
              <input
                className="input"
                name="name"
                id="name"
                placeholder="eg: Barnes Bridge Ladies"
                value={this.state.formData.name || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>

            <div className="field">
              <label className="label" htmlFor="crew">Crew ID</label>
              <input
                className="input"
                name="crew"
                id="crew"
                placeholder="eg: 123456"
                value={this.state.formData.id || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.crew && <small className="help is-danger">{this.state.errors.crew}</small>}
            </div>

            <div className="field">
              <div className="control">
                <label className="label" htmlFor="club">Club</label>
                <Select id="club" onChange={this.handleSelect} options={this.getClubs()}/>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label" htmlFor="event">Event</label>
                <Select id="event" onChange={this.handleSelect} options={this.getEvents()}  />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="penalty">Penalty in seconds</label>
              <input
                className="input"
                name="penalty"
                id="penalty"
                placeholder="eg: 5"
                value={this.state.formData.penalty || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.penalty && <small className="help is-danger">{this.state.errors.penalty}</small>}
            </div>

            <div className="field">
              <label className="label" htmlFor="manualOverride">Override race time</label>
              <input
                className="input"
                name="manualOverride"
                id="manualOverride"
                placeholder="eg: 16:09.12"
                value={this.state.formData.manual_override_time || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.manual_override_time && <small className="help is-danger">{this.state.errors.manual_override_time}</small>}
            </div>

            <div className="field">
              <label className="label" htmlFor="composite_code">Composite code</label>
              <input
                className="input"
                name="composite_code"
                id="composite_code"
                placeholder="eg: HSC/BBL"
                value={this.state.formData.composite_code || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.composite_code && <small className="help is-danger">{this.state.errors.composite_code}</small>}
            </div>

            <div className="field">
              <label className="label" htmlFor="rowingCRI">Rowing CRI</label>
              <input
                className="input"
                name="rowingCRI"
                id="rowingCRI"
                placeholder="eg: 342"
                value={this.state.formData.rowing_CRI || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.rowing_CRI && <small className="help is-danger">{this.state.errors.rowing_CRI}</small>}
            </div>

            <div className="field">
              <label className="label" htmlFor="rowingCRIMax">Rowing CRI Max</label>
              <input
                className="input"
                name="rowingCRIMax"
                id="rowingCRIMax"
                placeholder="eg: 342"
                value={this.state.formData.rowing_CRI_max || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.rowing_CRI_max && <small className="help is-danger">{this.state.errors.rowing_CRI_max}</small>}
            </div>

            <div className="field">
              <label className="label" htmlFor="scullingCRI">Sculling CRI</label>
              <input
                className="input"
                name="scullingCRI"
                id="scullingCRI"
                placeholder="eg: 342"
                value={this.state.formData.sculling_CRI || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.sculling_CRI && <small className="help is-danger">{this.state.errors.sculling_CRI}</small>}
            </div>

            <div className="field">
              <label className="label" htmlFor="scullingCRIMax">Sculling CRI Max</label>
              <input
                className="input"
                name="scullingCRIMax"
                id="scullingCRIMax"
                placeholder="eg: 342"
                value={this.state.formData.sculling_CRI_max || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.sculling_CRI_max && <small className="help is-danger">{this.state.errors.sculling_CRI_max}</small>}
            </div>


            <br />
            <button className="button is-primary">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default CrewEdit
