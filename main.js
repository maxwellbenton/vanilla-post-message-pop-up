const state = {
  data: {}
}
const cancelButton = document.querySelector('#cancel')

function updateStateData(newData) {
  console.warn('current state.data', JSON.stringify(state.data))
  state.data = newData
  console.warn('new state.data', JSON.stringify(state.data))
}

window.addEventListener('message', (event) => {
  try {
    console.log('message', event)
    const parsedData = JSON.parse(event.data)
    const namespace = Object.keys(parsedData)[0]
    const data = parsedData[namespace]
    if (data.replyTo === 'ready123' && data.topic === 'TPW_DCF_READY' && data.procedure === 'out') {
      console.warn('READY data response received')
      updateStateData(data.payload)
    }

    if (data.replyTo === 'action123' && data.topic === 'TPW_DCF_ACTION' && data.procedure === 'out') {
      console.warn('ACTION response received')
    }
        
  } catch (e) {
    console.log('error ->', e)
  }
})

function init() {
  const readyMessage = '{"mastercard.src.sdk.tpw":{"id":"ready123","topic":"TPW_DCF_READY","procedure":"over"}}'

  const actionMessage = '{"mastercard.src.sdk.tpw":{"id":"action123","topic":"TPW_DCF_ACTION","procedure":"over"}}'
  const targetWindow = window.opener || window.parent
  targetWindow.postMessage(readyMessage, '*')

  cancelButton.addEventListener('click', () => {
    console.warn('CLICKED')
    targetWindow.postMessage(actionMessage, '*')
  })
}

init()
