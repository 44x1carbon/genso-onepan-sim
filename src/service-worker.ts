self.addEventListener("install", (event) => {
    console.log("install")
})

self.addEventListener("message", (event) => {
    const { type, payload } = event.data;

    switch (type) {
        case "notification": {
            const { title, body, data, id } = payload as { title: string, body: string, data: any, id: string };
            event.waitUntil(
                self.registration.showNotification(title, {
                    body: body,
                    icon: "/logo.png",
                    tag: '',
                    data: {
                        ...data,
                        id,
                    }
                })
            );
            break;
        }
    }
})

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: "window"
    }).then((clientList) => {
        for (const client of clientList) {
            client.postMessage(event.notification.data)
        }
    }));
});
