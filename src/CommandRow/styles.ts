import { Theme, createStyles } from '@material-ui/core'

export const useStyles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'left',
    color: '#b7babe',
    minHeight: '60px',
    padding: '20px 36px',
    width: '100%',
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
    flexGrow: 1,
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
})
