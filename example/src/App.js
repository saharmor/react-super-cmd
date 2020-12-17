import React, {useState} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {configure, GlobalHotKeys} from "react-hotkeys";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import OfflineBoltOutlined from "@material-ui/icons/OfflineBoltOutlined";
import CommandLineModal from "react-super-cmd";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {List, ListItem, ListItemText} from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = (theme) => ({
  root: {
    backgroundColor: '#fbfafa',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    padding: '30px',
  },
  cmd: {
    backgroundColor: '#dedede',
  },
  listBullet: {
    marginRight: '3px',
  },
});

const App = ({classes}) => {
  const [cmdLineModal, setCmdLineModal] = useState(true);
  const [lastRunCmd, setLastRunCmd] = useState(null);

  const commands = {
    SEARCH_CONTACT: {
      name: 'Search', logo: <SearchOutlinedIcon/>, shortcut: 'S', callback: () => setLastRunCmd('SEARCH_CONTACT')
    },
    ADD_CONTACT: {
      name: 'Add', logo: <AddCircleOutlineIcon/>, shortcut: '⌘ A', callback: () => setLastRunCmd('ADD_CONTACT')
    },
    DELETE_CONTACT: {
      name: 'Delete', logo: <RemoveCircleOutlineOutlinedIcon/>, shortcut: '⌘ D', callback: () => setLastRunCmd('DELETE_CONTACT')
    },
    UPDATE_CONTACT: {
      name: 'Update', logo: <UpdateOutlinedIcon/>, shortcut: null, callback: () => setLastRunCmd('UPDATE_CONTACT')
    },
    REACH_OUT_CONTACT: {
      name: 'Reach out', logo: <UpdateOutlinedIcon/>, shortcut: 'ctrl+R', callback: () => setLastRunCmd('REACH_OUT_CONTACT')
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

  configure({
    ignoreTags: ['input', 'select', 'textarea'],
    ignoreEventsCondition: function () {
    }
  });

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Grid className={classes.root} container alignItems='center' spacing={3}>
        <Grid item>
          <Typography align="center" variant="h3">react-super-cmd <span role="img" aria-label="lightning-emoji">⚡</span></Typography>
          <Typography align="center" variant="h6">The command line experience for the no-mouse generation.</Typography>
          <Typography align="center" variant="h6">A blazing fast command line to allow your users to seamlessly interact with your React app.</Typography>
        </Grid>
        <Grid item>
          <img width='500px' src={require('./static/demo_image.png')} alt="Command"/>
        </Grid>
        <Grid item>
          <Typography variant="h6">Possible applications</Typography>
          <List dense>
            <ListItem>
              <FiberManualRecordIcon className={classes.listBullet} fontSize="small"/>
              <ListItemText primary="In-app navigation" primaryTypographyProps={{variant: "body1"}}/>
            </ListItem>
            <ListItem>
              <FiberManualRecordIcon className={classes.listBullet} fontSize="small"/>
              <ListItemText primary="Search for contacts/items/files" primaryTypographyProps={{variant: "body1"}}/>
            </ListItem>
            <ListItem>
              <FiberManualRecordIcon className={classes.listBullet} fontSize="small"/>
              <ListItemText primary="Any other use cases required a list of options to select from" primaryTypographyProps={{variant: "body1"}}/>
            </ListItem>
          </List>
        </Grid>
        <CommandLineModal commands={commands} isOpen={cmdLineModal} toggleIsModalOpen={toggleIsOpen}
                          title={"Super Command"} logo={<OfflineBoltOutlined/>}/>
        {!lastRunCmd && <Grid item>
          <Typography align="center" variant="body1">
            Give it a spin <span role="img" aria-label="point-emoji">👉</span> Press cmd+k to start <span role="img" aria-label="magic-emoji">✨</span>
          </Typography>
        </Grid>}
        {lastRunCmd && <Grid item>
          <Typography variant="h4">Command selected <code className={classes.cmd}>{lastRunCmd}</code></Typography>
        </Grid>}
      </Grid>
    </GlobalHotKeys>
  )
}

export default withStyles(useStyles)(App);