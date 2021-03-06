import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import * as getters from "../getters"
import InternService from "../services/InternService"
import InternInput from "./InternInput"

@connect(() => ({
  roles: getters.roles,
}))
export default class AddIntern extends React.Component {
  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRoleChange = this.handleRoleChange.bind(this)
    this.state = {
      isSending: false,
      roleId: -1,
      username: "",
    }
  }

  handleSave(e) {
    e.preventDefault()
    if (this.state.isSending) {
      return
    }

    this.setState({ isSending: true })
    InternService.addRoleToIntern(this.state.username, this.state.roleId).then(
      () => {
        this.setState({
          isSending: false,
          roleId: -1,
          username: "",
        })
      },
      error => {
        alert(error.responseText)
        this.setState({ isSending: false })
      },
    )
  }

  handleRoleChange(e) {
    this.setState({ roleId: e.target.value })
  }

  renderRoleSelector() {
    return (
      <select
        id="role-sel"
        className="form-control"
        value={this.state.roleId}
        onChange={this.handleRoleChange}
      >
        <option value={-1} disabled>
          Select a value
        </option>
        {this.props.roles
          .get("data")
          .toJS()
          .map(role => {
            return (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            )
          })}
      </select>
    )
  }

  handleChange(field) {
    return event => {
      this.setState({ [field]: event.target ? event.target.value : event })
    }
  }

  render() {
    if (this.props.roles.get("isLoading")) {
      return <div>Loading...</div>
    }
    return (
      <div className="panel panel defaul">
        <div className="panel-heading">Register intern</div>
        <div className="panel-body">
          <form className="form-inline" onSubmit={this.handleSave}>
            <div className="form-group">
              <InternInput
                value={this.state.username}
                onChange={this.handleChange("username")}
              />
            </div>
            {this.renderRoleSelector()}
            <input type="submit" className="form-control btn-success" />
          </form>
        </div>
      </div>
    )
  }
}
