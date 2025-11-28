from .. import socketio


@socketio.on('connect')
def connect():
    socketio.emit('message', {'msg': 'Websocket connected!'})

@socketio.on('disconnect')
def disconnect():
    socketio.emit('message',{'msg':'Websocket disconnected!'})

@socketio.on('event')
def newevent(data):
    socketio.emit('event',data,broadcast=True)