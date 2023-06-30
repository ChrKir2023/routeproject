import React, {useState, useEffect} from 'react'

const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([])
    console.log("ChatBar",users);
    
    var uniqueUsers = [];
    users.filter(function(item){
    var i = uniqueUsers.findIndex(x => (x.userName == item.userName && x.socketID == item.socketID));
    if(i <= -1){
        uniqueUsers.push(item);
    }
    return null;
    });
    console.log(uniqueUsers)

    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

  return (
    <div className='chat__sidebar'>
        <h2>Ανοιγμα συνομιλίας</h2>
        <div>
            <h4  className='chat__header'>ΕΝΕΡΓΟΙ ΧΡΗΣΤΕΣ</h4>
            <div className='chat__users'>
                {uniqueUsers.map(user => <p key={user.socketID}>{user.userName}</p>)}
            </div>
        </div>
  </div>
  )
}

export default ChatBar