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

>Props:
- text: Text to de displayed on the tooltip.
- children: Component that will trigger the tooltip.

>Example:
```
  <SiriusTooltip text="This will appear on the tooltip">
     children component
  </SiriusTooltip>
```

## Sirius Led

>The Sirius Led is a component in the format of a Led that can turn into different colors based on a threshold dictionary, always triggering the key corresponding to the last value exceeded.

>Props:
- shape: Set the shape of the Led. Values:
  * 'circle': Circle Led
  * 'square': Square Led
  * 'squ_circ': Square Led with round corners

- color: Customize the color for each threshold value.

  * The colors of each threshold can be determined by using the color parameter, for it to work the key of the color has to be the same as the key of the desired threshold it represents.

  * The nc (Not Connected) and normal thresholds colors have default values in case they are not specified.

  ```
    const threshold_colors = {
      'alert': '#f8ff1b',
      'alarm': '#ff1b1b'
    }
  ```

>Example:
```
  <SiriusLed pv_name="A:RANDOM:PV" shape={'circle'} threshold={random_threshold}/>
```
