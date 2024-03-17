const RoomPage = ({ setRoom, setIsAuth }) => {
  //form gonderilince tetiklenecek fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();
    const room = e.target[0].value;
    //console.log(room);
    setRoom(room.toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Room</h1>
      <p>Which Room will You Enter</p>
      <input type="text" placeholder="exp:weekday" required />

      <button type="submit">Enter Room</button>
      <button
        onClick={() => {
          //yetki stateni false vekerek oda logine yonlendirir
          setIsAuth(false);
          //localdeki kayit kalkar ve tekrra giris yapmaya yondenririr
          localStorage.removeItem("token");
        }}
        type="button"
      >
        Logout
      </button>
    </form>
  );
};

export default RoomPage;
