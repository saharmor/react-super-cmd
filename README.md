<p align="center">
  <h2 align="center">React Super Command</h2>
  <img src="https://i.ibb.co/FYWBRSb/Screenshot-2020-12-16-at-16-42-30.png"/><br/>
</p>

[![NPM](https://img.shields.io/npm/v/react-super-cmd.svg)](https://www.npmjs.com/package/react-super-cmd) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The command line experience for the no-mouse generation.
Allow your users to seamlessly interact with your React app with a blazing fast command line.
<br><br>
[Live demo]()
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
    DELETE_CONTACT: {
      name: 'Delete', logo: <RemoveCircleOutlineOutlinedIcon/>, shortcut: '⌘ D', callback: () => console.log('delete')
    },
  };

  function toggleIsOpen() {
    setCmdLineModal(previousState => !previousState);
  };

  return (
    <CommandLineModal commands={commands} isOpen={cmdLineModal} toggleIsModalOpen={toggleIsOpen}
                      title={"Super Command"} logo={<OfflineBoltOutlined/>}/>
  );
};

export default App;
```

## Defining commands

`react-super-cmd` uses commands

## License

`react-super-cmd` is released under MIT license © [saharmor](https://github.com/saharmor).
