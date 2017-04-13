import React, {Component} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        // Pass props to parent class
        super(props);
        this.state = {
            list: [],
            newlist: []
        };
        this.filterList = this.filterList.bind(this);
    }

    componentDidMount() {
        axios.get('https://profiles.umassmed.edu/ProfilesAPI/api/v1/Persons/pageSize/15/page/1/personid', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.setState({list: response.data.profiles});
            this.setState({newlist: this.state.list});
        }).catch((error) => {
            console.log("error", error);
        });
    }

    filterList(event) {
        var updatedList = this.state.list;
        var string = '';
        updatedList = updatedList.filter(function(item) {
            string = item.displayname + ' ' + item.departmentname;
            return string.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({newlist: updatedList});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>New Profiles UI</h2>
                </div>
                <div>
                    <form>
                        <fieldset>
                            <input type="text" className="searchBar" placeholder="Search" onChange={this.filterList}/>
                        </fieldset>
                    </form>
                    <List profiles={this.state.newlist}/>
                </div>

            </div>
        );
    }
}

class List extends Component {
    render() {
        return (
            <table>
            <th>Name</th>
            <th>Department</th>
                {this.props.profiles.map(function(item) {
                    return <tr>
                        <td data-category={item}>{item.displayname}</td>
                        <td>{item.departmentname}</td>
                    </tr>
                })
}
            </table>
        )
    }
};

export default App;
