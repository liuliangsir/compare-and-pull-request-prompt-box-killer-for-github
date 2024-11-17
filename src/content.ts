function getElements(wrapper: Element) {
  return wrapper.querySelectorAll<HTMLElement>(
    ':scope > :not(.Box-sc-g0xbh4-0.bGojzy)'
  )
}

function initLocationChange() {
  const initMutationObserver = () => {
    const targetNode = document.querySelector('.Box-sc-g0xbh4-0.jzuOtQ')
    if (!targetNode) return

    const handleElementHide = (wrapper: Element) => {
      getElements(wrapper).forEach((element) => {
        if (element.style.display === 'none') return

        element.style.display = 'none'
      })
    }

    handleElementHide(targetNode)
    // MutationObserver is used to handle the dynamic content
    new MutationObserver((mutations) => {
      mutations.forEach(({ type }) => {
        if (type !== 'childList') return

        handleElementHide(targetNode)
      })
    }).observe(targetNode, { subtree: true, childList: true })
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMutationObserver)
    return
  }

  initMutationObserver()
}

export default defineContentScript({
  matches: ['*://github.com/*'],
  main(ctx) {
    initLocationChange()
    ctx.addEventListener(window, 'wxt:locationchange', initLocationChange)
  }
})
