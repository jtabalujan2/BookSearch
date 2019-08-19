//React
import React from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime'

//Components
import SearchBar from './SearchBar'
import AuthorTable from './Table'
import Box from '@material-ui/core/Box';

/*
Parent Component
---------------------
- Contains state for entire application
- Goal was to prevent children from having to contain state (i.e. search bar)
   - Notice all the children all functional components only handling props
   - State is only in the parent
   - Functional components are faster + lighter!
- Handles any actions + api call


Material-UI was used because of familiarity and ease of use
- Very complete Component Library 
- Tables, buttons, search forms were pre-built
- Although a little verbose, custom components would end up with similar amounts of code
- Far more complex and time consuming to set up myself and style


Other Notes:
- Used Parcel for the first time and very impressed with the learning curve + time to set up
- Tried to limit dependencies to Material UI + Babel + React
- Most time consuming portion was trying to get Material UI to work the way I wanted it to (both UI and functionality wise)
- Wasn't 100% sure what "User shouldn't have to press button to execute search" so I assumed that meant searching only on blur. 
   - Searching on change was the only other thought, but I would imagine that as very expensive if we were using an API that cost money or
     just the time required in order for the API to send back the data
   - Still implemented a "OnSubmit" functionality in case it meant to use the "enter" key on keyboard
- No point in using redux, application is too small and doesn't really solve any problems React's native state functionality can't solve.
  I have a belief that just because we can use a technology, doesn't mean we shouldn't unless it can really benefit the app.
  No point in adding tech that brings no value to the application and instead extra layers of complexity
*/


class App extends React.Component {
   
   state = {
      input: '',
      data: null,
      columnName: ['Title','Author','Year Published']
   }
   
   handleSearch = async () => {
      if(this.state.input!== '') {
               const result = await this.makeSearch(this.state.input)
      this.setState({
         data: result.docs
      })
      }
   }
   
   handleChange = (value) => {
      if(value === '') {
         this.setState({data: null})
      }
      
      this.setState({input: value})
   }
   
   makeSearch = async (query) => {
      const response = await fetch(`http://openlibrary.org/search.json?title=${query.split().join('+')}`)
      const dataResp = response.json();
      
      return dataResp
   }
   
   render() {
      return(
         <React.Fragment>

         <Box display="flex" justifyContent="center" alignItems="center">
            <SearchBar currentSearch={this.state.input} onSearch={this.handleSearch} onChange={this.handleChange}/>
         </Box>

         <Box display="flex" justifyContent="center">
            {this.state.data === null  ? 
               (<></>) : 
               (<AuthorTable columnNames={this.state.columnName} tableData={this.state.data}/>)
            }
         </Box>

         </React.Fragment>
      )
   }
}
   
ReactDOM.render(<App />, document.getElementById("app"))