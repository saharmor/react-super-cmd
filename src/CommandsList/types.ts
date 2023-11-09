import { Command } from 'CommandRow'

export type Props = {
  classes: {
    [key: string]: string
  },
  commands: {
    [key: string]: Command
  }
  highlightedCmdName: string
  setHighlightedCallback: (name: string) => void
  handleEnter: () => void
  ignoreHover: boolean
  toggleIgnoreHover: () => void
}
