import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';


const useStyles = (theme) => ({
  root: {
    backgroundColor: '#212121',
    display: 'flex',
    width: '100%',
    margin: '24px 0',
  },
  inputField: {
    flex: '1',
    border: 'none',
    boxShadow: 'inset 3px 0 0 #dcb865',
    backgroundColor: 'inherit',
    color: '#b7babe',
  },
  input: {
    color: '#f1f2f2',
    paddingLeft: '30px',
    fontSize: '21px',
    lineHeight: '28px',
  }
});

const AutocompleteCommandField = ({classes, handleChange, onKeyPress}) => {
  const [inputValue, setInputValue] = useState('');

  function onChange(event) {
    setInputValue(event.target.value);
    handleChange(event.target.value);
  }

  return (
    <div className={classes.root}>
      <TextField className={classes.inputField} value={inputValue} onChange={onChange} autoFocus={true} onKeyDown={onKeyPress}
                 fullWidth InputProps={{className: classes.input, disableUnderline: true}}/>
    </div>
  )
}

export default withStyles(useStyles)(AutocompleteCommandField);
