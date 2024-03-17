import { auth } from "../firebase/config";

const Message = ({ data }) => {
  //oturumu acik olan id'si mesaji atana esitse bunu degilse farkli mesaji basacagiz

  if (auth.currentUser?.uid === data.author.id) {
    return <p className="msg-user">{data.text}</p>;
  }
  //esit degilse kullanici bildisi ve mesajini bas
  return (
    <div className="msg-other">
      <div className="user-info">
        <img src={data.author.photo} />
        <span>{data.author.name}</span>
      </div>
      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;
