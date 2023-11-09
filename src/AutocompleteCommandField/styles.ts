import { Theme, createStyles } from '@material-ui/core'

export const useStyles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: '#212121',
    display: 'flex',
    width: '100%',
    margin: '1.5rem 0',
  },
  inputField: {
    flex: '1',
    border: 'none',
    boxShadow: 'inset 0.1875rem 0 0 #dcb865',
    backgroundColor: 'inherit',
    color: '#b7babe',
  },
  input: {
    color: '#f1f2f2',
    paddingLeft: '1.875rem',
    fontSize: '1.3125rem',
    lineHeight: '1.75rem',
  }
})
