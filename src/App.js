import React , { useState } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import ModalCard from '@vkontakte/vkui/dist/components/ModalCard/ModalCard';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import View from '@vkontakte/vkui/dist/components/View/View';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import List from '@vkontakte/vkui/dist/components/List/List';
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import '@vkontakte/vkui/dist/vkui.css';
import Butt from "./img/button.png"
import Bg from "./img/bg.png"
import bridge from '@vkontakte/vk-bridge';
import Icon24Replay from '@vkontakte/icons/dist/24/replay';
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import "./style.css"
import Icon16Done from '@vkontakte/icons/dist/16/done';

const App = () => {
	const [ activeModal , setModal ] = useState(null);
	const [ panel, setPanel ] = useState("app");
	const [ sub , setSub ] = useState(true);
	const [ snack, setSnack ] = useState(null);

	const modals =
	<ModalRoot activeModal={activeModal}>
	<ModalCard
          id="first"
					icon={<Icon56ErrorOutline style={{color: 'var(--destructive)'}}/>}
          onClose={() => setModal(null)}
          header="Атеншн!"
          actions={[{
            title: 'Понял(а)',
            mode: 'destructive',
            action: () => {
							bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 138292893}).then(() => {
							bridge.send("VKWebAppShowStoryBox", {"background_type":"image","url":`https://i.ibb.co/Qp7gJ5b/bg.png`,"locked":true,"stickers":[{"sticker_type":"renderable","sticker":{"content_type":"image","url":`https://i.ibb.co/j5zKFrX/button.png`,"clickable_zones":[{"action_type":"link","action":{"link":"https://vk.com/vk_cake","tooltip_text_key":"tooltip_open_link"},"clickable_area":[{"x":0,"y":0},{"x":584,"y":0},{"x":584,"y":130},{"x":0,"y":130}]}]}}]})
							.then(() => {
								bridge.send("VKWebAppSendPayload", {"group_id": 138292893,"payload": {"foo": "bar"}})
								setModal(null)
								setSnack(
									<Snackbar
        					layout="vertical"
        					onClose={setSnack(null)}
        					before={<Avatar size={24} style={{backgroundColor: 'var(--accent)'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
      						>
        История опубликована.
      </Snackbar>
								)
							})
							.catch(() => {
								setPanel("error")
								setModal(null)
							})
						})
						}
          }]}
        >
				<Div>
				<td dangerouslySetInnerHTML={{__html: "Сейчас тебе нужно будет опубликовать себе историю с репостом группы, после чего ты получишь сообщение с результатом в ЛС.</br></br>2 марта в 12:00 МСК мы методом рандома выберем одного победителя.</br><b>Не забывай:</b> мы проверяем все условия 😏"}}/>
				</Div>
        </ModalCard>
	</ModalRoot>

	return (
		<View activePanel={panel} modal={modals}>

		<Panel id="app">
			<PanelHeader>Конкурс</PanelHeader>
		<Div>
		 <Button before={<Icon24DoneOutline/>} size="xl" onClick={() => setModal('first')} mode="secondary">Участвовать</Button>
	 </Div>
	 { sub === true ?
	 <Div>
	 <Card mode="shadow">
	 <Group>
	 <Div>
	 Не забывай, чтобы участвовать в конкурсе, нужно быть подписанным на сообщество ✅
	 </Div>
	 </Group>
	 <Group>
	 <Cell
		 bottomContent={<Button onClick={() => {
			 bridge.send("VKWebAppJoinGroup", {"group_id": 138292893})
			 .then(() => setSub(false))
		 }}>Подписаться</Button>}
		 before={<Avatar src="https://sun9-28.userapi.com/c850032/v850032452/178679/BcA0L1O__Hg.jpg" size={80}/>}
		 size="l">
	 VK Cake
	 </Cell>
	 </Group>
	 </Card>
	 </Div> : null}
	 {snack}
	</Panel>

	<Panel id="error">
		<PanelHeader left={<PanelHeaderBack onClick={() => setPanel('app')}/>}><font color="red">Ошибка</font></PanelHeader>
			<Group>
				<Div>Произошла ошибка! Возможные причины ошибки:</Div>
				</Group>
				<Group>
				<List>
				<Cell indicator={<Counter mode="prominent">1</Counter>}>Вы вошли через веб версию.</Cell>
				<Cell multiline indicator={<Counter mode="prominent">2</Counter>}>Вы используете неофициальный клиент.</Cell>
				<Cell indicator={<Counter mode="prominent">3</Counter>}>Вы отменили отправку истории.</Cell>
				</List>
				<Div>
				<Button before={<Icon24Replay/>} size="xl" onClick={() => {
					setPanel("app")
					setModal("first")
				}}>Вернуться</Button>
				</Div>
				</Group>
		</Panel>
	</View>
	);
};

export default App;
