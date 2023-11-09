import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import { useStyles } from './styles'
import { Props } from './types'

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
