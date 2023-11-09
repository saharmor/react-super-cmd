import { ChangeEvent, KeyboardEvent, MouseEvent, ReactNode, useRef, useState } from 'react'
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
  Typography,
  Theme,
  createStyles,
} from '@material-ui/core'
import AutocompleteCommandField from './AutocompleteCommandField'
import CommandsList from './CommandsList'
import { OfflineBoltOutlined } from '@material-ui/icons'
import { Command } from './CommandRow'

const useStyles = (theme: Theme) => createStyles({
  paperRoot: {
    padding: '10px 0 10px 0',
    minWidth: '760px',
    maxHeight: '380px',
    backgroundColor: '#212121',
    borderRadius: '4px',
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.7), 0 0px 10px 0 #000, 0.15px 0.5px 0 0 rgba(255, 255, 255, 0.1) inset'
  },
  backdropRoot: {
    backgroundColor: 'transparent',
  },
  dialogTitle: {
    margin: '12px 36px',
    padding: '0px',
  },
  titleSection: {
    color: '#d4d6d8',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  title: {
    marginLeft: '8px',
  },
  dialogBody: {
    padding: '0px',
    overflow: 'hidden',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  noOptionsText: {
    color: '#d4d6d8',
    padding: '12px 36px',
  },
  commandsList:{
    paddingRight: '3px',
  }
})

enum Direction {
  down = 'down',
  up = 'up'
}

type Props = {
  classes: {
    [key: string]: string
  },
  commands: {
    [key: string]: Command
  }
  isOpen: boolean
  toggleIsModalOpen: () => void
  title: string
  noOptionsText: string
  logo: ReactNode
  highlightedCmdName: string
  setHighlightedCallback: (name: string) => void
  handleEnter: () => void
  ignoreHover: boolean
  toggleIgnoreHover: () => void
}

const CommandLineModal = ({
  classes,
  commands,
  isOpen,
  toggleIsModalOpen,
  title,
  noOptionsText = 'No commands found. Try a different search term.',
  logo = <OfflineBoltOutlined />,
}: Props) => {
  const commandsInternal = Object.entries(commands).reduce(
    (acc: {
      [key: string]: Command
    }, [commandName, properties]: [string, Command]) => ({
      ...acc,
      [commandName]: { ...properties, ref: useRef(null) }
    }), {})
  const [inputValue, setInputValue] = useState<string>('')
  const [possibleCommands, setPossibleCommands] = useState<{
    [key: string]: Command
  }>({})
  const [highlightedCmdName, setHighlightedCmdName] = useState<string>(Object.keys(possibleCommands)[0])
  const [ignoreHover, setIgnoreHover] = useState<boolean>(false)
  const changeHighlightedCmd = (commandName: string) => setHighlightedCmdName(commandName)
  const toggleIgnoreHover = () => setIgnoreHover((prevState: boolean) => !prevState)
  const setPossibleCommandsWithSearchTerm = (searchTerm: string) => {
    const inputToSearch = searchTerm.toLowerCase()
    const tempPossibleCommands = Object.entries(commandsInternal).reduce(
      (acc: {
        [key: string]: Command
      }, [commandName, properties]: [string, Command]) => ({
        ...acc,
        [commandName]: properties,
      }), {})
    setPossibleCommands(tempPossibleCommands)
    changeHighlightedCmd(Object.keys(tempPossibleCommands)[0])
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setPossibleCommandsWithSearchTerm(newSearchTerm)
    setInputValue(newSearchTerm)
  }
  const reset = () => {
    setInputValue('')
    setPossibleCommands(commandsInternal)
    setHighlightedCmdName(Object.keys(commandsInternal)[0])
  }
  const handleCommandSelected = () => {
    if (highlightedCmdName) {
      (possibleCommands[highlightedCmdName].callback || (() => null))()
      toggleIsModalOpen()
      reset()
    }
  }
  const onArrowsPress = (direction: Direction) => {
    setIgnoreHover(true)
    const keysArray = Object.keys(possibleCommands)
    const currSelectedIndex = keysArray.indexOf(highlightedCmdName)
    const selectedCommandName = direction === Direction.down
      ? currSelectedIndex + 1 === keysArray.length
        ? keysArray[0]
        : keysArray[currSelectedIndex + 1]
      : currSelectedIndex - 1 < 0
        ? keysArray[keysArray.length - 1]
        : keysArray[currSelectedIndex - 1]

    changeHighlightedCmd(selectedCommandName)
    commandsInternal[selectedCommandName]?.ref?.current?.scrollIntoView()
  }
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enterx') handleCommandSelected()
    else if (e.key === 'ArrowUp') onArrowsPress(Direction.up)
    else if (e.key === 'ArrowDown') onArrowsPress(Direction.down)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={toggleIsModalOpen}
      fullWidth
      PaperProps={{
        classes: { root: classes.paperRoot },
      }}
      BackdropProps={{
        classes: { root: classes.backdropRoot },
      }}
      TransitionProps={{ timeout: 0 }}
    >
      <DialogTitle
        id="form-dialog-title"
        className={classes.dialogTitle}
      >
        <div className={classes.titleSection}>
          {logo}
          <Typography variant="body1" className={classes.title}>
            {title}
          </Typography>
        </div>
        <Divider className={classes.divider} />
      </DialogTitle>
      <DialogContent className={classes.dialogBody}>
        <Grid container>
          <Grid item xs={12}>
            <AutocompleteCommandField
              fieldValue={inputValue}
              onChange={handleInputChange}
              onKeyPress={onKeyPress}
            />
          </Grid>
          <Grid item xs={12} className={classes.commandsList}>
            {Object.keys(possibleCommands).length > 0 && (
              <CommandsList
                commands={possibleCommands}
                highlightedCmdName={highlightedCmdName}
                setHighlightedCallback={changeHighlightedCmd}
                handleEnter={handleCommandSelected}
                ignoreHover={ignoreHover}
                toggleIgnoreHover={toggleIgnoreHover}
              />
            )}
            {Object.keys(possibleCommands).length === 0 && (
              <Typography className={classes.noOptionsText} variant="body1">
                {noOptionsText}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(useStyles)(CommandLineModal)
