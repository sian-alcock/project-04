import React from 'react'
import axios from 'axios'

class CrewEdit extends React.Component {
  constructor() {
    super()
    this.state= {
      formData: {},
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/crews/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  render() {

    console.log(this.state.crews)

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
                placeholder="eg: Smith-Jones"
                value={this.state.formData.name || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>

            <div className="field">
              <label className="label" htmlFor="crew_id">BROE Crew ID</label>
              <input
                className="input"
                name="crew_id"
                id="crew_id"
                placeholder="eg: 123456"
                value={this.state.formData.crew_id || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.crew_id && <small className="help is-danger">{this.state.errors.crew_id}</small>}
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


            <br />
          </form>
        </div>
      </section>
    )
  }
}

export default CrewEdit
