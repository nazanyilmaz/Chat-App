import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  const sendMessage = async (e) => {
    e.preventDefault();
    //console.log(e.target[0].value);

    //colleciyon referansi alma
    const messagesCol = collection(db, "messages");

    //collection'a yeni document ekleme
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    //console.log(auth)
    //inputu sifirlama
    e.target.reset();
  };
  //mevcut odadan gonderilen verilerin anlik olarak alinmasi
  useEffect(() => {
    //collection referansi alma
    const messagesCol = collection(db, "messages");
    //sorgu ayarlari olusturma
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //messages'daki verileri alma
    //collection'daki verileri alik izler onsnapshot
    //collection her degistiginde verdigimiz fonksiyon ile tum documanlara erisiyoruz.
    onSnapshot(q, (snapshot) => {
      //verilerin gecici tutlacagi bos dizi olusturlalim
      const tempMsg = [];
      //dokumanlari donelim verilerini alalim
      snapshot.docs.forEach((doc) => {
        tempMsg.push(doc.data());
      });
      //console.log(tempMsg);
      //messaglari statte aktaralim
      setMessages(tempMsg);
    });
  }, []);

  //console.log(auth);
  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Other Room</button>
      </header>

      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>

      <form onSubmit={sendMessage}>
        <input type="text" required placeholder="Type your message.." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
