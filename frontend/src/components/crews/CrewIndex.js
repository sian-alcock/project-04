import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const moment = require('moment')
const momentDurationFormatSetup = require('moment-duration-format')
momentDurationFormatSetup(moment)
typeof moment.duration.fn.format === 'function'
typeof moment.duration.format === 'function'
const _ = require('lodash').runInContext()


class CrewIndex extends React.Component {
  constructor() {
    super()
    this.state= {
      crews: [],
      searchTerm: '',
      sortTerm: 'finish_sequence|asc',
      crewsWithoutStartTimeBoolean: false,
      crewsWithoutFinishTimeBoolean: false
    }

    this.formatTimes = this.formatTimes.bind(this)
    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.combineFiltersAndSort = this.combineFiltersAndSort.bind(this)
    this.handleCrewsWithoutStartTime = this.handleCrewsWithoutStartTime.bind(this)
    this.handleCrewsWithoutFinishTime = this.handleCrewsWithoutFinishTime.bind(this)
    this.getNumCrewsWithoutStartTimes = this.getNumCrewsWithoutStartTimes.bind(this)
    this.getNumCrewsWithoutFinishTimes = this.getNumCrewsWithoutFinishTimes.bind(this)
  }

  componentDidMount() {
    axios.get('/api/crews/')
      .then(res => this.setState(
        { crews: res.data, crewsToDisplay: res.data },
        () => this.combineFiltersAndSort(this.state.crews))
      )
  }

  formatTimes(timeInMs) {
    const duration = moment.duration(timeInMs).format('h:mm:ss.SS')
    return duration
  }

  getNumCrewsWithoutStartTimes(){
    return this.state.crews.filter(crew => !crew.start_time).length
  }

  getNumCrewsWithoutFinishTimes(){
    return this.state.crews.filter(crew => !crew.finish_time).length
  }

  handleSearchKeyUp(e){
    this.setState({
      searchTerm: e.target.value
    }, () => this.combineFiltersAndSort(this.state.crews))
  }

  handleSortChange(e){
    this.setState({ sortTerm: e.target.value }, () => this.combineFiltersAndSort(this.state.crews))
  }

  handleCrewsWithoutStartTime(e){
    this.setState({
      crewsWithoutStartTimeBoolean: e.target.checked
    }, () => this.combineFiltersAndSort(this.state.crews))
  }


  handleCrewsWithoutFinishTime(e){
    this.setState({
      crewsWithoutFinishTimeBoolean: e.target.checked
    }, () => this.combineFiltersAndSort(this.state.crews))
  }

  combineFiltersAndSort(filteredCrews) {
    let filteredBySearchText
    let filteredByCrewsWithoutStartTime
    let filteredByCrewsWithoutFinishTime
    // Create filter based on Regular expression of the search term
    const re= new RegExp(this.state.searchTerm, 'i')

    if(!this.state.searchTerm) {
      filteredBySearchText = this.state.crews
    } else {
      filteredBySearchText = this.state.crews.filter(crew => re.test(crew.name))
    }

    if(this.state.crewsWithoutStartTimeBoolean) {
      filteredByCrewsWithoutStartTime = this.state.crews.filter(crew => !crew.start_time)
    } else {
      filteredByCrewsWithoutStartTime = this.state.crews
    }

    if(this.state.crewsWithoutFinishTimeBoolean) {
      filteredByCrewsWithoutFinishTime = this.state.crews.filter(crew => !crew.finish_time)
    } else {
      filteredByCrewsWithoutFinishTime = this.state.crews
    }

    _.indexOf = _.findIndex
    filteredCrews = _.intersection(this.state.crews,  filteredBySearchText, filteredByCrewsWithoutStartTime, filteredByCrewsWithoutFinishTime)

    const [field, order] = this.state.sortTerm.split('|')
    const sortedCrews = _.orderBy(filteredCrews, [field], [order])
    return this.setState({ crewsToDisplay: sortedCrews })

  }

  render() {

    console.log(this.state.crewsToDisplay)

    return (
      <section className="section">
        <div className="container">

          <div className="field control has-icons-left">
            <span className="icon is-left">
              <i className="fas fa-search"></i>
            </span>
            <input className="input is-fullwidth" placeholder="search" onKeyUp={this.handleSearchKeyUp} />

          </div>

          <div className="field">
            <div className="select is-fullwidth">
              <select onChange={this.handleSortChange}>
                <option value="name|asc">Name A-Z</option>
                <option value="name|desc">Name Z-A</option>
                <option value="start_sequence|asc">Start sequence, asc</option>
                <option value="start_sequence|desc">Start sequence, desc</option>
                <option value="finish_sequence|asc">Finish sequence, asc</option>
                <option value="finish_sequence|desc">Finish sequence, desc</option>
                <option value="club.index_code|asc">Club, asc</option>
                <option value="club.index_code|desc">Club, desc</option>
                <option value="event.name|asc">Event, asc</option>
                <option value="event.name|desc">Event, desc</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label className="checkbox" >
              <input type="checkbox"  className="checkboxRadio" value="crewsWithoutStartTime" onClick={this.handleCrewsWithoutStartTime} />
              {`Crews without start time (${this.getNumCrewsWithoutStartTimes()})`}
            </label>
          </div>

          <div className="field">
            <label className="checkbox" >
              <input type="checkbox"  className="checkboxRadio" value="crewsWithoutFinishTime" onClick={this.handleCrewsWithoutFinishTime} />
              {`Crews without finish time (${this.getNumCrewsWithoutFinishTimes()})`}
            </label>
          </div>

          <table className="table">
            <thead>
              <tr>
                <td>Crew ID</td>
                <td>Crew</td>
                <td>Club</td>
                <td>Event</td>
                <td>Start sequence</td>
                <td>Finish sequence</td>
                <td><abbr title="Penalty">P</abbr></td>
                <td><abbr title="Handicap">H</abbr></td>
                <td>Start time</td>
                <td>Finish time</td>
                <td>Race time</td>
                <td><abbr title="Position in category">Pos</abbr></td>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td>Crew ID</td>
                <td>Crew</td>
                <td>Club</td>
                <td>Event</td>
                <td>Start sequence</td>
                <td>Finish sequence</td>
                <td><abbr title="Penalty">P</abbr></td>
                <td><abbr title="Handicap">H</abbr></td>
                <td>Start time</td>
                <td>Finish time</td>
                <td>Race time</td>
                <td><abbr title="Position in category">Pos</abbr></td>
              </tr>
            </tfoot>
            <tbody>
              {this.state.crewsToDisplay && this.state.crewsToDisplay.map(crew =>
                <tr key={crew.id}>
                  <td><Link to={`/crews/${crew.id}`}>{crew.id}</Link></td>
                  <td>{crew.name}</td>
                  <td>{crew.club.index_code}</td>
                  <td>{crew.event.name}</td>
                  <td>{crew.start_sequence ? crew.start_sequence : '⚠️'}</td>
                  <td>{crew.finish_sequence ? crew.finish_sequence : '⚠️'}</td>
                  <td>{crew.penalty}</td>
                  <td>{crew.handicap}</td>
                  <td>{crew.start_time ? this.formatTimes(crew.start_time) : '⚠️'}</td>
                  <td>{crew.finish_time ? this.formatTimes(crew.finish_time) : '⚠️'}</td>
                  <td>{crew.raw_time ? this.formatTimes(crew.raw_time) : '⚠️'}</td>
                  <td>pos?</td>
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
