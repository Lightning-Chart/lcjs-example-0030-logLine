window.lcjsSmallView = window.devicePixelRatio >= 2
if (!window.__lcjsDebugOverlay) {
    window.__lcjsDebugOverlay = document.createElement('div')
    window.__lcjsDebugOverlay.style.cssText = 'position:fixed;top:10px;left:10px;background:rgba(0,0,0,0.7);color:#fff;padding:4px 8px;z-index:99999;font:12px monospace;pointer-events:none'
    const attach = () => { if (document.body && !window.__lcjsDebugOverlay.parentNode) document.body.appendChild(window.__lcjsDebugOverlay) }
    attach()
    setInterval(() => {
        attach()
        window.__lcjsDebugOverlay.textContent = window.innerWidth + 'x' + window.innerHeight + ' dpr=' + window.devicePixelRatio + ' small=' + window.lcjsSmallView
    }, 500)
}
/*
 * LightningChart JS Example that showcases Logarithmic Axes feature.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Import xydata
const xydata = require('@lightningchart/xydata')

// Extract required parts from LightningChartJS.
const { lightningChart, ColorHEX, emptyFill, SolidFill, emptyLine, Themes } = lcjs

// Import data-generator from 'xydata'-library.
const { createProgressiveFunctionGenerator } = xydata

// Initialize chart.
const chart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .ChartXY({
        theme: (() => {
    const t = Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    return t && window.lcjsSmallView ? lcjs.scaleTheme(t, 0.5) : t
})(),
textRenderer: window.lcjsSmallView ? lcjs.htmlTextRenderer : undefined,
        // Specify default Y Axis as logarithmic.
        defaultAxisY: {
            type: 'logarithmic',
            // Use 10 as base number.
            base: '10',
        },
    })
    .setTitle('Logarithmic Axis vs Linear Axis')
    .setCursorMode('show-nearest')

const yAxisLogarithmic = chart.getDefaultAxisY().setTitle('Logarithmic Y Axis')

// Add a second Y Axis that is linear.
const yAxisLinear = chart
    .addAxisY({
        type: 'linear',
    })
    .setTitle('Linear Y Axis')
    // Remove tick grid lines from second Y Axis
    .setTickStrategy('Numeric', (tickStrategy) =>
        tickStrategy
            .setMinorTickStyle((tickStyle) => tickStyle.setGridStrokeStyle(emptyLine))
            .setMajorTickStyle((tickStyle) => tickStyle.setGridStrokeStyle(emptyLine)),
    )

// Graph 2 functions on both Axes.
const xStep = 0.1
const functions = [
    { label: 'f(x) = x', xStart: xStep, xEnd: 10, Y: (x) => x },
    { label: 'f(x) = 10^x', xStart: xStep, xEnd: 3.0, Y: (x) => 10 ** x },
]

// Generate function data in predefined X values range.
Promise.all(
    functions.map((info) =>
        createProgressiveFunctionGenerator()
            .setStart(info.xStart)
            .setEnd(info.xEnd)
            .setStep(xStep)
            .setSamplingFunction(info.Y)
            .generate()
            .toPromise(),
    ),
).then((dataSets) => {
    // Create two series for each function, one on each Axis.
    dataSets.forEach((dataSet, iFunction) => {
        const info = functions[iFunction]
        ;[yAxisLinear, yAxisLogarithmic].forEach((yAxis, iAxis) => {
            const series = chart
                .addLineSeries({
                    yAxis,
                })
                .setName(info.label)
                .setStrokeStyle((style) => style.setThickness(5))
                .appendJSON(dataSet)
        })
    })

    // Fit Axes immediately.
    yAxisLinear.fit()
    yAxisLogarithmic.fit()
})
