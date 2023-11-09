import { ChangeEvent, KeyboardEvent } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import { Theme, createStyles } from '@material-ui/core'

const useStyles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: '#212121',
    display: 'flex',
    width: '100%',
    margin: '1.5rem 0',
  },
  inputField: {
    flex: '1',
    border: 'none',
    boxShadow: 'inset 0.1875rem 0 0 #dcb865',
    backgroundColor: 'inherit',
    color: '#b7babe',
  },
  input: {
    color: '#f1f2f2',
    paddingLeft: '1.875rem',
    fontSize: '1.3125rem',
    lineHeight: '1.75rem',
  }
})

type Props = {
  classes: {
    [key: string]: string
  }
  fieldValue: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyPress: (e: KeyboardEvent<HTMLDivElement>) => void
}

const AutoCompleteCommandField = ({
  classes,
  fieldValue,
  onChange,
  onKeyPress,
}: Props) => (
  <div className={classes.root}>
    <TextField
      className={classes.inputField}
      fullWidth
      onChange={onChange}
      onKeyDown={onKeyPress}
      value={fieldValue}
      InputProps={{
        className: classes.input,
        disableUnderline: true,
      }}
    />
  </div>
)

export default withStyles(useStyles)(AutoCompleteCommandField)
