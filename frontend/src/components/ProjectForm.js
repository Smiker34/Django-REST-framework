import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: '', link: '', users: [] }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).index + 1)
        }
        this.setState({ 'users': users })
    }

    handleSubmit(event) {
        this.props.create_project(this.state.title, this.state.link, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                    <input type="text" name="title" placeholder='title'
                        value={this.state.title} onChange={(event) => this.handleChange(event)} />
                </div>
                <div>
                    <input type="text" name="link" placeholder='link'
                        value={this.state.link} onChange={(event) => this.handleChange(event)} />
                </div>
                <div>
                    <select name='users' multiple onChange={(event) => this.handleProjectChange(event)}>
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
export default ProjectForm