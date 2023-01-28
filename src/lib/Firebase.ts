import { initializeApp, type FirebaseApp } from 'firebase/app';

let app: FirebaseApp | undefined = undefined;

const setupFirebaseApp = () => {
    if (app === undefined) {
        const firebaseConfig = {
            apiKey: 'AIzaSyDJiJ7iOX4zQ6l4wH89G1R-vQu5xZ6KAHE',
            authDomain: 'genso-tools.firebaseapp.com',
            projectId: 'genso-tools',
            storageBucket: 'genso-tools.appspot.com',
            messagingSenderId: '1021494508287',
            appId: '1:1021494508287:web:283adc5a6e81ea4a54eaca',
            measurementId: 'G-2YTL0DQ3WQ'
        };

        // Initialize Firebase
        app = initializeApp(firebaseConfig);
    }

    return app;
}

export default setupFirebaseApp