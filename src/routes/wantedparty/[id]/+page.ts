import type { Load } from '@sveltejs/kit';
import useFirestore from '$lib/wantedparty/Firestore';

export const load: Load = async ({ params }) => {
    const firestore = useFirestore();
    const wantedParty = await firestore.getWantedParty(params.id);
    return {
        wantedParty
    };
};