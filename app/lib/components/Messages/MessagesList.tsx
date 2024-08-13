import { EventMessage } from "../../types";
import Message from "./Message";

interface IMessagesList {
    messages: EventMessage[];
}

const MessagesList = ({messages}: IMessagesList) => {
    return (
        <>
        {messages.map(message => {
              return (<Message
              message = {message} key={message.id} />)
        })}
        </>
    )
}

export default MessagesList;