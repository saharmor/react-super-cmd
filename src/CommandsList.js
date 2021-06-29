import React from "react";
import CommandRow from "./CommandRow";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = (theme) => ({
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
      <div className={classes.child}>
        {Object.keys(commands).map((command, _) => {
            return <CommandRow key={command} commandName={command} command={commands[command]}
                               isHighlighted={command === highlightedCmdName} onClick={handleEnter}
                               onHover={onHoverCallback}/>
          }
        )}
      </div>
    </div>
  )
};

export default withStyles(useStyles)(CommandsList);