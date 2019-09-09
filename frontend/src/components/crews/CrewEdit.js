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
      allEvents: {},
      allRaceTimes: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.getClubs = this.getClubs.bind(this)
    this.getStartTimes = this.getStartTimes.bind(this)

  }

  // componentDidMount() {
  //   axios.get(`/api/crews/${this.props.match.params.id}`)
  //     .then(res => this.setState({ formData: res.data }))
  // }

  componentDidMount() {
    Promise.all([
      axios.get(`/api/crews/${this.props.match.params.id}`), // i.e. axios.get(something)
      axios.get('/api/race-times/')
    ]).then(([res1, res2]) => {
      // console.log(res1.data, res2.data)
      this.setState({formData: res1.data, allRaceTimes: res2.data})
    }).catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  getClubs(){
    const clubs = this.state.allClubs.map(club => ({value: club, label: club}))
    console.log(clubs)
    this.setState({ clubs })
  }

  getStartTimes(){

    const startTimesArray = Array.from(this.state.allRaceTimes)
    const filteredStartTimes = startTimesArray.filter(time => time.tap === 'Start' && !time.crew).map(startTime => startTime.time_tap)

    const startTimes = filteredStartTimes.map(startTime => ({value: startTime, label: startTime}))
    return startTimes
  }

  render() {

    console.log(this.state.allRaceTimes)

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
                value={this.state.formData.crew || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.crew && <small className="help is-danger">{this.state.errors.crew}</small>}
            </div>

            <div className="field">
              <div className="control">
                <label className="label" htmlFor="startTime">Start Time</label>
                <Select id="startTime" onChange={this.handleSelect} options={this.getStartTimes()} />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label" htmlFor="club">Club</label>
                <Select id="club" onChange={this.handleSelect} options={this.state.clubs} />
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
