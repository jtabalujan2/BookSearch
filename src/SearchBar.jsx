//React
import React from 'react'

//Components - Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/*
Search Form Component - Child
-------------------------
- Still a controlled component with the value being what is the state being passed in as a prop
- Uses callback trick to pass values from child to parent
- Included Reset Button since I'd assume each search button would want some kind of reset
*/


const SearchBar = (props) => {
   
   let search; 
   const classes = useStyles();
   
   const handleChange = (event) => {
      props.onChange(search.value)
   }
   
   const resetSearch = (event) => {
      props.onChange('')
   }
   
   const handleSubmit = (event) => {
      event.preventDefault();
      props.onSearch()
   }
   
   return(
      <>
      <form className={classes.container} onSubmit={handleSubmit} onBlur={handleSubmit}>
      <TextField 
         type="text"
         id="outlined-name"
         label="Search"
         className={classes.textField} 
         value={props.currentSearch} 
         onChange={handleChange}
         inputRef={n => search = n}
         margin="normal"
         variant="outlined"
         inputProps={{className: classes.input}}
      />
      </form>
      
      <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={resetSearch}>Reset</Button>
      </>
   )
      
}
   
export default SearchBar
   
//Searchbar Styling
const useStyles = makeStyles(theme => ({

   textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
   },
   dense: {
      marginTop: theme.spacing(2),
   },
   menu: {
      width: 200,     
   },
   button: {
      margin: theme.spacing(1),
      height: '20%'
   },
   input: {
      WebkitBoxShadow: "0 0 0 1000px #8c9eff inset",
      "&:-webkit-autofill": {
         WebkitBoxShadow: "0 0 0 1000px #8c9eff inset",
      }
   },
}));
   