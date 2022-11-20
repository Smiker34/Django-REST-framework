import React from 'react'

class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { project: 1, note: '', creator: 1 }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleProjectChange(event) {
        this.setState(
            {
                'project': event.target.selectedOptions.item(0).index + 1
            }
        );
    }

    handleCreatorChange(event) {
        this.setState(
            {
                'creator': event.target.selectedOptions.item(0).index + 1
            }
        );
    }

    handleSubmit(event) {
        this.props.create_TODO(this.state.project, this.state.note, this.state.creator)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                    <select name='project' onChange={(event) => this.handleProjectChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.Title}</option>)}
                    </select>
                </div>
                <div>
                    <input type="text" name="note" placeholder='note'
                        value={this.state.title} onChange={(event) => this.handleChange(event)} />
                </div>
                <div>
                    <select name='creator' onChange={(event) => this.handleCreatorChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.first_name}</option>)}
                    </select>
                </div>

                <div>
                    <input type="submit" value="Save" />
                </div>
            </form>
        );
    }
}
export default TODOForm