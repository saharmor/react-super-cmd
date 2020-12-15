import React, {useState} from 'react';
import {GlobalHotKeys} from "react-hotkeys";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import {OfflineBoltOutlined} from "@material-ui/icons";
import CommandLineModal from "react-super-cmd";


const App = () => {
  const [cmdLineModal, setCmdLineModal] = useState(true);

  const commands = {
    SEARCH_CONTACT: {
      name: 'Search', desc: 'Search contact', logo: <SearchOutlinedIcon/>, shortcut: 'S', callback: () => console.log('search')
    },
    ADD_CONTACT: {
      name: 'Add', desc: 'Add contact', logo: <AddCircleOutlineIcon/>, shortcut: '⌘ A', callback: () => console.log('add')
    },
    DELETE_CONTACT: {
      name: 'Delete', desc: 'Delete contact', logo: <RemoveCircleOutlineOutlinedIcon/>, shortcut: '⌘ D', callback: () => console.log('delete')
    },
    UPDATE_CONTACT: {
      name: 'Update', desc: 'Update contact', logo: <UpdateOutlinedIcon/>, shortcut: null, callback: () => console.log('update')
    }
  }

  function toggleIsOpen() {
    setCmdLineModal(previousState => !previousState);
  }

  const keyMap = {TOGGLE_MODAL: "cmd+k"};
  const handlers = {
    TOGGLE_MODAL: () => {
      toggleIsOpen();
    },
  };

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
        <div>Example Component: Press cmd+k to start <span role="img" aria-label="magic-emoji">✨</span></div>
        <div>Examples: navigation, simple callbacks</div>
        <CommandLineModal commands={commands} isOpen={cmdLineModal} toggleIsModalOpen={toggleIsOpen} title={"Superhuman Command"}
                          logo={<OfflineBoltOutlined/>}/>
      </GlobalHotKeys>
    </>
  )
}

export default App
