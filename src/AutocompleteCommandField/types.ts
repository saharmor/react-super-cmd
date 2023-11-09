import { ChangeEvent, KeyboardEvent } from 'react'

export type Props = {
  classes: {
    [key: string]: string
  }
  fieldValue: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyPress: (e: KeyboardEvent<HTMLDivElement>) => void
}
