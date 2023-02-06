import { redirect, type Load } from '@sveltejs/kit';
import useFirestore from '$lib/wantedparty/Firestore';
import { goto } from '$app/navigation';

export const load: Load = async ({ params }) => {
    const firestore = useFirestore();

    try {
        const wantedParty = await firestore.getWantedParty(params.id);
        return {
            wantedParty
        };
    } catch {
        throw redirect(302, "/wantedparty")
    }
};