import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Panel, PanelHeader, Div, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './index.scss'
import SwitcherButton from './components/SwitcherButton';

const App = () => {
  const [beatInterval, setBeatInterval] = useState(null)

  const [buttons, setButtons] = useState([
    {
      id: 0,
      active: false,
    },
    {
      id: 1,
      active: false,
    },
    {
      id: 2,
      active: false,
    },
    {
      id: 3,
      active: false,
    },
    {
      id: 4,
      active: false,
    },
    {
      id: 5,
      active: false,
    },
    {
      id: 6,
      active: false,
    },
    {
      id: 7,
      active: false,
    },
  ])

  const [currentButton, setCurrentButton] = useState(0)

  const toggleButtonActive = index => {
    return () => {
      setButtons(buttons.map((btn, i) => i === index ? {...btn, active: !btn.active} : btn))
    }
  }

  const startBeat = () => {
    setBeatInterval(setInterval(async () => {
      let actualBtns = {}

      setButtons(btns => {
        actualBtns = btns
        
        return btns
      })

      let actualCurrentBtn = null

      setCurrentButton(currentBtn => { 
        actualCurrentBtn = currentBtn

        return currentBtn
      })

      const nextCurrentBtn = actualCurrentBtn == 7 ? 0 : actualCurrentBtn + 1
      
      await bridge.send("VKWebAppFlashSetLevel", {"level": +!actualBtns[nextCurrentBtn].active});

      setCurrentButton(currentBtn => { 
        return nextCurrentBtn
      })
    }, 1000))
  }

  const stopBeat = () => {
    clearInterval(beatInterval)
    setBeatInterval(null)
  }

  useEffect(() => {
    const init = async () => {
      await bridge.send("VKWebAppInit");

      await bridge.send("VKWebAppFlashGetInfo");
    }

    init()
  }, [])

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel='main'>
					<Panel id='main'>
						<PanelHeader>
							Бит фонариком)
						</PanelHeader>
						<Div>
              <div className="buttons">
                {buttons.map((el, index) => (
                  <SwitcherButton active={el.active} toggleActive={toggleButtonActive(index)} current={currentButton === index} />
                ))}
              </div>
              <Button mode="commerce" onClick={startBeat} disabled={!!beatInterval} style={{marginRight: '10px'}} size={'l'}>Старт</Button>
              <Button mode="destructive" onClick={stopBeat} disabled={!beatInterval} size={'l'}>Стоп</Button>
						</Div>
					</Panel>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
