self.addEventListener("install", (event) => {
    console.log("install")
})

self.addEventListener("message", (event) => {
    const { type, payload } = event.data;

    switch (type) {
        case "notification": {
            const { title, body } = payload as { title: string, body: string };
            event.waitUntil(
                self.registration.showNotification(title, {
                    body: body,
                    icon: "/logo.png",
                    tag: ''
                })
            );
            break;
        }
    }


})