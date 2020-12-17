import React from "react";
import CommandRow from "./CommandRow";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = (theme) => ({
  root: {
    maxHeight: '240px',
    overflowY: 'scroll',
    scrollbarColor: '#757474',
  },
})

const CommandsList = ({classes, commands, highlightedCmdName, setHighlightedCallback, handleEnter, ignoreHover, toggleIgnoreHover}) => {
  function onHoverCallback(hoveredCmdName) {
    if (!ignoreHover) {
      setHighlightedCallback(hoveredCmdName);
    } else {
      toggleIgnoreHover();
    }
  }

  return (
    <div className={classes.root}>
      {Object.keys(commands).map((command, _) => {
          return <CommandRow key={command} commandName={command} command={commands[command]}
                             isHighlighted={command === highlightedCmdName} onClick={handleEnter}
                             onHover={onHoverCallback}/>
        }
      )}
    </div>
  )
};

export default withStyles(useStyles)(CommandsList);