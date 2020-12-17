import React, {useState, useRef} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AutocompleteCommandField from "./AutocompleteCommandField";
import CommandsList from "./CommandsList";
import OfflineBoltOutlined from "@material-ui/icons/OfflineBoltOutlined";

const useStyles = (theme) => ({
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
});


const CommandLineModal = ({
                            classes, commands, isOpen, toggleIsModalOpen, title,
                            noOptionsText = "No command found. Try a different search term.",
                            logo = <OfflineBoltOutlined/>
                          }) => {
  let commandsInternal = {};
  Object.entries(commands).map(([commandName, properties]) => {
    commandsInternal[commandName] = {...properties, ref: useRef(null)}
  });

  const [inputValue, setInputValue] = useState('');
  const [possibleCommands, setPossibleCommands] = useState(commandsInternal);
  const [highlightedCmdName, setHighlightedCmdName] = useState(Object.keys(possibleCommands)[0]);
  const [ignoreHover, setIgnoreHover] = useState(false);

  function changeHighlightedCmd(commandName) {
    setHighlightedCmdName(commandName);
  }

  function toggleIgnoreHover() {
    setIgnoreHover(previousState => !previousState);
  }

  function setPossibleCommandsWithSearchTerm(searchTerm) {
    const inputToSearch = searchTerm.toLowerCase();
    let tempPossibleCommands = {};
    Object.entries(commandsInternal).map(([commandName, properties]) => {
      if (properties.name.toLowerCase().includes(inputToSearch)) {
        tempPossibleCommands[commandName] = properties
      }
    });
    setPossibleCommands(tempPossibleCommands);
    changeHighlightedCmd(Object.keys(tempPossibleCommands)[0]);
  }

  function handleInputChange(event) {
    const newSearchTerm = event.target.value;
    setPossibleCommandsWithSearchTerm(newSearchTerm);
    setInputValue(newSearchTerm);
  }

  function reset() {
    setInputValue('');
    setPossibleCommands(commandsInternal);
  }

  function handleCommandSelected() {
    if (highlightedCmdName) {
      possibleCommands[highlightedCmdName]['callback']();
      toggleIsModalOpen();
      reset();
    }
  }

  function onArrowsPress(direction) {
    setIgnoreHover(true);
    const keysArray = Object.keys(possibleCommands);
    const currSelectedIndex = keysArray.indexOf(highlightedCmdName);

    let selectedCommandName = null;
    if (direction === "down") {
      if (currSelectedIndex + 1 === keysArray.length) {
        selectedCommandName = keysArray[0];
      } else {
        selectedCommandName = keysArray[currSelectedIndex + 1];
      }
    } else if (direction === "up") {
      if (currSelectedIndex - 1 < 0) {
        selectedCommandName = keysArray[keysArray.length - 1];
      } else {
        selectedCommandName = keysArray[currSelectedIndex - 1];
      }
    }

    changeHighlightedCmd(selectedCommandName);
    commandsInternal[selectedCommandName].ref.current.scrollIntoView();
  }

  function onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      handleCommandSelected();
    } else if (event.which === 38 /* Arrow Up */) {
      onArrowsPress('up');
    } else if (event.which === 40 /* Arrow Down*/) {
      onArrowsPress('down');
    }
  }

  return (
    <Dialog open={isOpen} onClose={toggleIsModalOpen} fullWidth PaperProps={{classes: {root: classes.paperRoot}}}
            BackdropProps={{classes: {root: classes.backdropRoot}}} TransitionProps={{timeout: 0}}>
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        <div className={classes.titleSection}>
          {logo}
          <Typography variant="body1" className={classes.title}>{title}</Typography>
        </div>
        <Divider className={classes.divider}/>
      </DialogTitle>

      <DialogContent className={classes.dialogBody}>
        <Grid container>
          <Grid item xs={12}>
            <AutocompleteCommandField fieldValue={inputValue} onChange={handleInputChange} onKeyPress={onKeyPress}/>
          </Grid>
          <Grid item xs={12}>
            {Object.keys(possibleCommands).length > 0 &&
            <CommandsList commands={possibleCommands} highlightedCmdName={highlightedCmdName}
                          setHighlightedCallback={changeHighlightedCmd} handleEnter={handleCommandSelected}
                          ignoreHover={ignoreHover} toggleIgnoreHover={toggleIgnoreHover}/>
            }
            {Object.keys(possibleCommands).length === 0 &&
            <Typography className={classes.noOptionsText} variant="body1">{noOptionsText}</Typography>
            }
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(useStyles)(CommandLineModal);
