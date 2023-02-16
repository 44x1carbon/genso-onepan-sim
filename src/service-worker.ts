self.addEventListener("install", (event) => {
    console.log("install")
})

self.addEventListener("message", (event) => {
    const { type, payload } = event;
    console.log(type, payload);

    switch (type) {
        case "notification": {
            const { title, message } = payload as { title: string, message: string };
            event.waitUntil(
                self.registration.showNotification(title, {
                    body: message,
                    icon: "/logo.png",
                    tag: ''
                })
            );
            break;
        }
    }


})