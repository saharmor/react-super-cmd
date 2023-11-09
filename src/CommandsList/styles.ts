import { Theme, createStyles } from '@material-ui/core'

export const useStyles = (theme: Theme) => createStyles({
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
