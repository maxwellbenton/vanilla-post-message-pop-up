const state = {
  data: {}
}
const cancelButton = document.querySelector('#cancel')

function updateStateData(newData) {
  console.warn('current state.data', JSON.stringify(state.data))
  console.warn('new state.data', JSON.stringify(newData))
  
  state.data = newData
}

window.addEventListener('message', ({ source, data, origin }) => {
  try {
    const parsedData = JSON.parse(data)
    const namespace = Object.keys(parsedData)[0]
    const data = parsedData[namespace]
    if (data.replyTo === 'ready123' && data.topic === 'TPW_DCF_READY' && data.procedure === 'out') {
      console.warn('READY data response received')
      state.data = data.payload
    }

    if (data.replyTo === 'action123' && data.topic === 'TPW_DCF_ACTION' && data.procedure === 'out') {
      console.warn('ACTION response received')
    }
        
  } catch (e) {
    console.log('error ->', e)
  }
})

function init() {
  const readyMessage = JSON.stringify({
    'mastercard.src.sdk.tpw': {
      id: 'ready123',
      topic: 'TPW_DCF_READY',
      procedure: 'over'
    }
  })

  const actionMessageObject = JSON.stringify({
    'mastercard.src.sdk.tpw': {
      id: 'action123',
        topic: 'TPW_DCF_ACTION',
      procedure: 'over'
    }
  })

  (window.opener || window.parent).postMessage(readyMessage, '*')

  cancelButton.addEventListener('click', () => {
    console.warn('CLICKED')
    (window.opener || window.parent).postMessage(actionMessage, '*')
  })
}

init()
