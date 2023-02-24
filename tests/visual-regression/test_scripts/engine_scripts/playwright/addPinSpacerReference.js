module.exports = async (page, scenario) => {
  await page.waitForLoadState();

  await page.evaluate(async () => {
    const pinSpacers = document.querySelectorAll('.pin-spacer')
    pinSpacers.forEach((spacer, index) => {
      const refDiv = document.createElement('div')
      const refDivStyle = {
        height: (spacer.style.height.replace('px', '') - spacer.style.paddingBottom.replace('px', ''))+'px',
        width: spacer.style.width,
        position: 'absolute',
        left: 0,
        top: spacer.style.paddingBottom,
      }
      Object.assign(refDiv.style, refDivStyle)
      refDiv.className = 'pin-spacer-reference'
      spacer.appendChild(refDiv)
    })
  })
}