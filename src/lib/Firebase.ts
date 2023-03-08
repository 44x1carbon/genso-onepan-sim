import { type FirebaseApp, initializeApp, getApps } from '@firebase/app'
import '@firebase/database'

let app: FirebaseApp | undefined = undefined;

export const setupFirebaseApp = (): FirebaseApp => {
    if (app === undefined) {
        const firebaseConfig = {
            apiKey: "AIzaSyDJiJ7iOX4zQ6l4wH89G1R-vQu5xZ6KAHE",
            authDomain: "genso-tools.firebaseapp.com",
            databaseURL: "https://genso-tools-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "genso-tools",
            storageBucket: "genso-tools.appspot.com",
            messagingSenderId: "1021494508287",
            appId: "1:1021494508287:web:283adc5a6e81ea4a54eaca",
            measurementId: "G-2YTL0DQ3WQ"
        };

        // Initialize Firebase        
        if (getApps().length === 0) {
            app = initializeApp(firebaseConfig);
        }
    }

    return app as FirebaseApp;
}

export default setupFirebaseApp