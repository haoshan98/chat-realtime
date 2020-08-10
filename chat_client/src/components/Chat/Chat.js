import React, { useState, useEffect } from 'react';
import queryString from 'query-string';  //help to get url
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        // const data = queryString.parse(location.search);
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, ({error}) => {
            alert(error);
        });

        console.log(socket);

        return () => {  //for unmounting
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);  //only rerender when these two is changed

    return (
        <h1>Chat</h1>
    )
}

export default Chat;