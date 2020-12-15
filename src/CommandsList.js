import React, {Fragment} from "react";
import CommandRow from "./CommandRow";

const CommandsList = ({commands, highlightedCmdName, setHighlightedCallback, handleEnter}) => {
  return (
    <Fragment>
      {Object.keys(commands).map((command, _) => {
          return <CommandRow key={command} commandName={command} command={commands[command]}
                             isHighlighted={command === highlightedCmdName} onClick={handleEnter}
                             onHover={setHighlightedCallback}/>
        }
      )}
    </Fragment>
  )
};

export default CommandsList;
