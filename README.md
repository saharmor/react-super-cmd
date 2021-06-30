<p align="center">
  <img width="350px" src="https://i.ibb.co/9rMgx60/demo-image.png" alt="Commandline modal"/><br/>
  <h2 align="center">React Super Command ⚡</h2>
</p>

[![NPM](https://img.shields.io/npm/v/react-super-cmd.svg)](https://www.npmjs.com/package/react-super-cmd) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The command-line experience for the no-mouse generation. A blazing fast command line for your users to seamlessly interact with your React app.
<br><br>
[Live demo](https://saharmor.github.io/react-super-cmd/)

## Installation

### npm

```bash
npm install --save react-super-cmd
```

### yarn

```bash
yarn add react-super-cmd
```

## Usage

```jsx
import React from 'react';
import CommandLineModal from "react-super-cmd";

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import OfflineBoltOutlined from "@material-ui/icons/OfflineBoltOutlined";


const App = () => {
  const [cmdLineModal, setCmdLineModal] = useState(true);

  const commands = {
    SEARCH_CONTACT: {
      name: 'Search', logo: <SearchOutlinedIcon/>, shortcut: 'S', callback: () => console.log('search')
    },
    ADD_CONTACT: {
      name: 'Add', logo: <AddCircleOutlineIcon/>, shortcut: '⌘ A', callback: () => console.log('add')
    },
  };

  function toggleIsOpen() {
    setCmdLineModal(previousState => !previousState);
  };

  return (
    <CommandLineModal commands={commands} 
                      isOpen={cmdLineModal} 
                      toggleIsModalOpen={toggleIsOpen}
                      title={"Super Command"} 
                      logo={<OfflineBoltOutlined/>}
                      noOptionsText = "No commands found. Try a different search term."
    />
  );
};

export default App;
```

## Props
### commands
Object representing the different commands to list. The key is command's name and value is another object containing command details. Example:
```
const commands = {
    SEARCH_CONTACT: {
      name: 'Search', logo: <SearchOutlinedIcon/>, shortcut: 'S', callback: () => console.log('search')
    },
    ADD_CONTACT: {
      name: 'Add', logo: <AddCircleOutlineIcon/>, shortcut: '⌘ A', callback: () => console.log('add')
    },
  };
```
Command details varibales

| Parameter  | Type      | Description | Example |
| :--------- | :-------- | :---------- | :----- |
| name       | `string`    | The text to be displayed for this command| Search 
| logo       | `component` | Component that will be next to command's name |`<SearchOutlinedIcon/>` from Material UI|
| shortcut   | `string`    | Shortcut text to display next to command name |⌘ S|
| callback   | `func`      | A function callback text to be displayed for this command|function searchCallback() {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log("search called")<br/>}|

### isOpen
If true, command line modal will be visible.

### toggleIsModalOpen
A function to be called to toggle modal state. Used to control isOpen state within the external component (e.g. `Super Command` in above example). 

### title
The title to be displayed for the command line modal (e.g. `<App>` in above example)

### logo
Optional<br>
A logo component to display as part of the title

### noOptionsTest
Optional<br> 
Text to show when no commands were found based on input search term

## Development
Follow create-react-library's [development guide](https://www.npmjs.com/package/create-react-library#development)

## License
`react-super-cmd` is released under MIT license © [saharmor](https://github.com/saharmor).
