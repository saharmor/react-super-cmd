import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
  root: {
    color: '#b7babe',
    minHeight: '60px',
    padding: '20px 36px',
    width: '100%',
    textAlign: 'left',
  },
  rootHighlighted: {
    minHeight: '60px',
    padding: '20px 36px',
    width: '100%',
    textAlign: 'left',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffffe6',
  },
  button: {
    flexGrow: '1',
  },
  cmdIcon: {
    width: '20px',
    height: '20px',
  },
  shortcut: {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '3px',
    maxHeight: '18px',
    minWidth: '19px',
    marginLeft: '4px',
    padding: "1px 5px 5px 5px",
    marginTop: "3px",
  }
});

const CommandRow = ({classes, command, commandName, isHighlighted, onHover, onKeyPress, onClick, ref}) => {
  const rootStyle = isHighlighted ? classes.rootHighlighted : classes.root;

  return (
    <ButtonBase ref={command['ref']} className={rootStyle} onClick={onClick} onMouseEnter={() => onHover(commandName)} onKeyPress={onKeyPress}>
      <Grid item container className={classes.button} justify="space-between">
        <Grid item xs={10} md={8}>
          <Grid container>
            <Grid item className={classes.cmdIcon} xs={1}>
              {command['logo']}
            </Grid>
            <Grid>
              <Typography variant="body1">{command['name']}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {command['shortcut'] && <Typography className={classes.shortcut} variant="body2" align="center">{command['shortcut']}</Typography>}
        </Grid>
      </Grid>
    </ButtonBase>
  )
}

export default withStyles(useStyles)(CommandRow);
