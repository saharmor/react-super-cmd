import CommandRow from 'CommandRow'
import { withStyles } from '@material-ui/core'
import { useStyles } from './styles'
import { Props } from './types'

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
