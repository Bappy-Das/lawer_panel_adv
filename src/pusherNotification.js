import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: "pusher",
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    encrypted: true,
    forceTLS: true,
    enabledTransports: ['ws', 'wss'],
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post(import.meta.env.VITE_MAIN_API_URL + '/api/broadcasting/auth',{
                    socket_id: socketId,
                    channel_name: channel.name
                },
                {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('_token'),
                    }
                }).then(response => {
                    callback(false, response.data);
                }).catch(error => {
                    callback(true, error);
                });
            }
        };
    },
})
      
window.Echo.connector.pusher.connection.bind('state_change', function(states) {
    if(states.current === 'disconnected') {
        window.Echo.connector.pusher.connect();
    }
});
// END
