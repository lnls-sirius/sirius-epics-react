# Sirius Epics React

>This project contains some default components for interacting with the EPICS control system using React.

# Installation

>This library can be installed with npm (https://www.npmjs.com/package/sirius-epics-react):
```
  npm i sirius-epics-react
```

>To be able to use it you have to import it in your code. 

Example:
```
  import { SiriusLabel, SiriusInvisible } from "sirius-epics-react";
```

## Sirius Tooltip

>The Sirius Tooltip is wrapped around the SiriusLabel and SiriusLed components so that when you click with the scroll button, the name of the PV being monitored in the component will appear.

Example:
```
  <SiriusTooltip text="This will appear on the tooltip">
     children component
  </SiriusTooltip>
```
