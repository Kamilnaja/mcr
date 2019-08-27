import React from 'react';

export class MainForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isSubmitted: false,
            room: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isSubmitted: true
        })
        console.log(this.state.username);
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleGenerate() {
        this.setState({
            room: 'Lorem mopsium dolor'
        })
    }

    handleRoomEnter(e) {
        console.log(e);
        e.preventDefault();
    }

    render() {
        return (
            <section>
                <h1>{this.state.username}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your name</label>
                    <input type="text" onChange={this.handleChange} value={this.state.username} />
                    <button type="submit">Submit</button>
                </form>

                {this.state.isSubmitted
                    ? <div>
                        <h1>
                            Username: {this.state.username}
                        </h1>
                        <div>
                            <button onClick={this.handleGenerate}>Create new room</button>
                        </div>
                        <div>
                            So, you can connect into:
                            <a href={this.state.room} onClick={e => this.handleRoomEnter} >{this.state.room}</a>
                        </div>
                    </div>
                    : ''}
            </section>
        )
    }
}