import CommandRow, { Command } from './CommandRow'
import { Theme, createStyles, withStyles } from '@material-ui/core'

const useStyles = (theme: Theme) => createStyles({
  root: {
    maxHeight: '220px',
    overflow: 'auto',

    "&::-webkit-scrollbar": {
      width: '8px',
      borderRadius: '5px',
      paddingRight: '3px',
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: '5px',
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: '5px',
      backgroundColor: "#757474",
    },
  },
  child: {
    height: '100%',
    margin: '0 auto',
  }
})

type Props = {
  classes: {
    [key: string]: string
  },
  commands: {
    [key: string]: Command
  }
  highlightedCmdName: string
  setHighlightedCallback: (name: string) => void
  handleEnter: () => void
  ignoreHover: boolean
  toggleIgnoreHover: () => void
}

const CommandsList = ({
  classes,
  commands,
  highlightedCmdName,
  setHighlightedCallback,
  handleEnter,
  ignoreHover,
  toggleIgnoreHover,
}: Props) => {
  const onHoverCallback = (hoveredCmdName: string) => {
    if (!ignoreHover) setHighlightedCallback(hoveredCmdName)
    else toggleIgnoreHover()
  }

  return (
    <div className={classes.root}>
      <div className={classes.child}>
        {Object.keys(commands).map((command: string) => (
          <CommandRow
            key={command}
            commandName={command}
            command={commands[command]}
            isHighlighted={command === highlightedCmdName}
            onClick={handleEnter}
            onHover={onHoverCallback}
            onKeyPress={() => null}
          />
        ))}
      </div>
    </div>
  )
}

export default withStyles(useStyles)(CommandsList)
