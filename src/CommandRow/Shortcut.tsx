import { Grid, Typography, withStyles } from '@material-ui/core'
import { useStyles } from './styles'

const Shortcut = ({ className, shortcut }: {
  className: string
  shortcut: string
}) => (
  <Grid container>
    {shortcut.split(' ').map((keyboardKey: string) => (
      <Grid item>
        <Typography
          className={className}
          variant="body2"
          align="center"
        >{keyboardKey}</Typography>
      </Grid>
    ))}
  </Grid>
)

export default withStyles(useStyles)(Shortcut)
