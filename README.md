# JavaScript Logarithmic Line Chart

![JavaScript Logarithmic Line Chart](logLine-darkGold.png)

This demo application belongs to the set of examples for LightningChart JS, data visualization library for JavaScript.

LightningChart JS is entirely GPU accelerated and performance optimized charting library for presenting massive amounts of data. It offers an easy way of creating sophisticated and interactive charts and adding them to your website or web application.

The demo can be used as an example or a seed project. Local execution requires the following steps:

-   Make sure that relevant version of [Node.js](https://nodejs.org/en/download/) is installed
-   Open the project folder in a terminal:

          npm install              # fetches dependencies
          npm start                # builds an application and starts the development server

-   The application is available at _http://localhost:8080_ in your browser, webpack-dev-server provides hot reload functionality.


## Description

This example showcases creation of logarithmic axes, highlighting the functional differences between linear and logarithmic axes using _line series_.

Logarithmic Axis can be created by supplying `type: 'logarithmic'` argument when the Axis is created:

```typescript
const chart = lightningChart().ChartXY({
    // Specify default Y Axis as logarithmic (10).
    defaultAxisY: {
        type: 'logarithmic',
        base: 10,
    },
})

// Add second Y Axis that is also logarithmic (Math.E).
const axis = chart.addAxisY({
    type: 'logarithmic',
    base: 'e',
})
```


## API Links

* [XY cartesian chart]
* [Color HEX factory]
* [Solid Line style]
* [Solid Fill style]
* [UI origins]


## Support

If you notice an error in the example code, please open an issue on [GitHub][0] repository of the entire example.

Official [API documentation][1] can be found on [LightningChart][2] website.

If the docs and other materials do not solve your problem as well as implementation help is needed, ask on [StackOverflow][3] (tagged lightningchart).

If you think you found a bug in the LightningChart JavaScript library, please contact sales@lightningchart.com.

Direct developer email support can be purchased through a [Support Plan][4] or by contacting sales@lightningchart.com.

[0]: https://github.com/Arction/
[1]: https://lightningchart.com/lightningchart-js-api-documentation/
[2]: https://lightningchart.com
[3]: https://stackoverflow.com/questions/tagged/lightningchart
[4]: https://lightningchart.com/support-services/

© LightningChart Ltd 2009-2022. All rights reserved.


[XY cartesian chart]: https://lightningchart.com/js-charts/api-documentation/v7.1.0/classes/ChartXY.html
[Color HEX factory]: https://lightningchart.com/js-charts/api-documentation/v7.1.0/functions/ColorHEX.html
[Solid Line style]: https://lightningchart.com/js-charts/api-documentation/v7.1.0/classes/SolidLine.html
[Solid Fill style]: https://lightningchart.com/js-charts/api-documentation/v7.1.0/classes/SolidFill.html
[UI origins]: https://lightningchart.com/js-charts/api-documentation/v7.1.0/variables/UIOrigins.html

