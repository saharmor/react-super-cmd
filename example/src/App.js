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
import {Link, List, ListItem, ListItemText} from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = (theme) => ({
  root: {
    backgroundColor: '#fbfafa',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    padding: '30px 30px 10px 30px',
  },
  headline: {
    marginBottom: '10px',
  },
  ctaText: {
    fontWeight: 'bold',
  },
  cmd: {
    backgroundColor: '#dedede',
  },
  listBullet: {
    fontSize: '10px',
    marginRight: '3px',
  },
  footer: {
    marginTop: '30px',
  }
});

const App = ({classes}) => {
  const [cmdLineModal, setCmdLineModal] = useState(false);
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
      <Grid className={classes.root} container alignItems='center' spacing={2}>
        <Grid item>
          <Typography className={classes.headline} align="center" variant="h4">
            react-super-cmd <span role="img" aria-label="lightning-emoji">⚡</span>
          </Typography>
          <Typography align="center" variant="h6">The command line experience for the no-mouse generation.</Typography>
          <Typography align="center" variant="h6">A blazing fast command line for your users to seamlessly interact with your React app.</Typography>
        </Grid>
        {!lastRunCmd && <Grid item>
          <Typography className={classes.ctaText} color="primary" align="center" variant="body1">
            Give it a spin <span role="img" aria-label="point-emoji">👉</span> Press <code className={classes.cmd}>cmd+k</code>
          </Typography>
        </Grid>}
        {lastRunCmd && <Grid item>
          <Typography variant="h4">Command selected <code className={classes.cmd}>{lastRunCmd}</code></Typography>
        </Grid>}
        <Grid item>
          <img width='500px' src={require('./static/demo_image.png')} alt="Command"/>
        </Grid>
        <Grid item>
          <Typography variant="h6">Possible applications</Typography>
          <List dense>
            <ListItem>
              <FiberManualRecordIcon className={classes.listBullet}/>
              <ListItemText primary="In-app navigation" primaryTypographyProps={{variant: "body1"}}/>
            </ListItem>
            <ListItem>
              <FiberManualRecordIcon className={classes.listBullet} fontSize="small"/>
              <ListItemText primary="Search for contacts/items/files" primaryTypographyProps={{variant: "body1"}}/>
            </ListItem>
            <ListItem>
              <FiberManualRecordIcon className={classes.listBullet} fontSize="small"/>
              <ListItemText primary="Any other use cases requiring a list of options to select from" primaryTypographyProps={{variant: "body1"}}/>
            </ListItem>
          </List>
        </Grid>
        <Grid item className={classes.footer}>
          <Grid item>
            <Typography variant={"body1"}>
              <Link href="https://github.com/saharmor/react-super-cmd" target="_blank" rel="noreferrer">
                By Sahar Mor
              </Link>
            </Typography>
          </Grid>
          <Grid item container justify="center" direction="row" spacing={1}>
            <Grid item>
              <Link href="https://github.com/saharmor/react-super-cmd" target="_blank" rel="noreferrer">
                <GitHubIcon fontSize="small"/>
              </Link>
            </Grid>
            <Grid item>
              <Link href="https://www.linkedin.com/in/sahar-mor/" target="_blank" rel="noreferrer">
                <LinkedInIcon/>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <CommandLineModal commands={commands} isOpen={cmdLineModal} toggleIsModalOpen={toggleIsOpen}
                          title={"Super Command"} logo={<OfflineBoltOutlined/>}/>
      </Grid>
    </GlobalHotKeys>
  )
}

export default withStyles(useStyles)(App);