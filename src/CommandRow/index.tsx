import {
  ButtonBase,
  Typography,
  withStyles,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './styles'
import Shortcut from './Shortcut'
import { Props } from './types'

const CommandRow = ({
  classes,
  command,
  commandName,
  isHighlighted,
  onClick,
  onHover,
  onKeyPress,
}: Props) => {
  const rootStyle = isHighlighted ? classes.rootHighlighted : classes.root
  const shortcutToKeys = (shortcut: string) => (
    <Shortcut
      className={classes.shortcut}
      shortcut={shortcut}
    />
  )

  return (
    <ButtonBase
      ref={command.ref}
      className={rootStyle}
      onClick={onClick}
      onMouseEnter={() => onHover(commandName)}
      onKeyPress={onKeyPress}
    >
      <Grid
        item
        container
        className={classes.button}
        justify="space-between"
      >
        <Grid item xs={10} md={8}>
          <Grid container>
            <Grid item className={classes.cmdIcon} xs={1}>{command.logo}</Grid>
            <Grid>
              <Typography variant="body1">{command.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {command.shortcut && shortcutToKeys(command.shortcut)}
        </Grid>
      </Grid>
    </ButtonBase>
  )
}

export * from './types'

export default withStyles(useStyles)(CommandRow)
