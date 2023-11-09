import {
  ButtonBase,
  Theme,
  Typography,
  createStyles,
  withStyles,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import {
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  ReactNode,
} from 'react'

const useStyles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'left',
    color: '#b7babe',
    minHeight: '60px',
    padding: '20px 36px',
    width: '100%',
  },
  rootHighlighted: {
    minHeight: '60px',
    padding: '20px 36px',
    width: '100%',
    textAlign: 'left',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffffe6',
  },
  button: {
    flexGrow: 1,
  },
  cmdIcon: {
    width: '20px',
    height: '20px',
  },
  shortcut: {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '3px',
    maxHeight: '18px',
    minWidth: '19px',
    marginLeft: '4px',
    padding: "1px 5px 5px 5px",
    marginTop: "3px",
  }
})

export interface Command {
  name: string
  logo: ReactNode
  callback?: () => void
  // ref: RefObject<HTMLButtonElement>
  shortcut: string
  ref?: MutableRefObject<HTMLButtonElement | null>
}

type Props = {
  classes: {
    [key: string]: string
  },
  command: Command
  commandName: string
  isHighlighted: boolean
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  onHover: (command: string) => void
  onKeyPress: (e: KeyboardEvent<HTMLButtonElement>) => void
}

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
  const shortcutToKeys = (shortcut: string) => {
    return (
      <Grid container>
        {
          shortcut.split(' ').map((keyboardKey: string) => (
            <Grid item>
              <Typography
                className={classes.shortcut}
                variant="body2"
                align="center"
              >{keyboardKey}</Typography>
            </Grid>
          ))
        }
      </Grid>
    )
  }

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

export default withStyles(useStyles)(CommandRow)
