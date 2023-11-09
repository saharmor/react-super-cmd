import {
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  ReactNode,
} from 'react'

export interface Command {
  name: string
  logo: ReactNode
  callback?: () => void
  shortcut: string
  ref?: MutableRefObject<HTMLButtonElement | null>
}

export type Props = {
  classes: {
    [key: string]: string
  },
  command: Command
  commandName: string
  isHighlighted: boolean
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  onHover: (command: string) => void
  onKeyPress: (e: KeyboardEvent<HTMLButtonElement>) => void
}
