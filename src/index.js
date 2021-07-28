/*
 * LightningChart JS Example that showcases Logarithmic Axes feature.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    ColorHEX,
    SolidLine,
    SolidFill,
    emptyLine,
    Themes
} = lcjs

// Import data-generator from 'xydata'-library.
const {
    createProgressiveFunctionGenerator
} = require('@arction/xydata')

// Initialize chart.
const chart = lightningChart().ChartXY({
    // theme: Themes.darkGold
    // Specify default Y Axis as logarithmic.
    defaultAxisY: {
        type: 'logarithmic',
        // Use 10 as base number.
        base: '10',
    }
})
    .setTitle('Logarithmic Axis vs Linear Axis')

const yAxisLogarithmic = chart.getDefaultAxisY()
    .setTitle('Logarithmic Y Axis')
    .setTitleMargin(10)

// Add a second Y Axis that is linear.
const yAxisLinear = chart.addAxisY({
    type: 'linear'
})
    .setTitle('Linear Y Axis')
    // Remove tick grid lines from second Y Axis
    .setTickStrategy('Numeric', tickStrategy => tickStrategy
        .setMinorTickStyle(tickStyle => tickStyle
            .setGridStrokeStyle(emptyLine)    
        )
        .setMajorTickStyle(tickStyle => tickStyle
            .setGridStrokeStyle(emptyLine)    
        )
    )

// Add LegendBox.
const legend = chart.addLegendBox()
    // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
    .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.30,
    })

// Graph 2 functions on both Axes.
const xStep = 0.1
const functions = [
    { label: 'f(x) = x', xStart: xStep, xEnd: 10, Y: (x) => x },
    { label: 'f(x) = 10^x', xStart: xStep, xEnd: 3.0, Y: (x) => 10 ** x },
]

// Generate function data in predefined X values range.
Promise.all(functions.map(info => 
    createProgressiveFunctionGenerator()
        .setStart(info.xStart)
        .setEnd(info.xEnd)
        .setStep(xStep)
        .setSamplingFunction(info.Y)
        .generate()
        .toPromise()
))
    .then((dataSets) => {
        // Create two series for each function, one on each Axis.
        dataSets.forEach((dataSet, iFunction) => {
            const info = functions[iFunction];
            const legendEntries = [];
            [yAxisLinear, yAxisLogarithmic].forEach((yAxis, iAxis) => {
                const series = chart.addLineSeries({
                    yAxis
                })
                    .setCursorResultTableFormatter((builder, _, x, y) => builder
                        .addRow(`${info.label } (${iAxis === 0 ? 'linear' : 'logarithmic'})`)
                        .addRow('X', '', x.toFixed(1))
                        .addRow('Y', '', y.toFixed(1))
                    )
                    .setName(info.label)
                    .setStrokeStyle((style) => style.setThickness(5))
                    .add(dataSet)

                console.log(series.getBoundaries())

                // Share LegendBoxEntry for both Series of the function.
                if (iAxis === 0) {
                    legend.add(series)
                    legend.setEntries((entry, component) => {
                        if (component === series) {
                            legendEntries[iFunction] = entry
                        }
                    })
                } else {
                    series.attach(legendEntries[iFunction])
                }
            })
        })

        // Fit Axes immediately.
        yAxisLinear.fit()
        yAxisLogarithmic.fit()
    })
