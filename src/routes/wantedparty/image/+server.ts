import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import useFirestore from '$lib/wantedparty/Firestore';

import { image_from_component, type RenderOptions } from 'svelte-component-to-image'

import WanterdPartyInfoOgp__SvelteComponent_ from '../../../components/wantedparty/WanterdPartyInfoOGP.svelte';

export const GET = (async ({ url }) => {
    const firestore = useFirestore();
    const id = url.searchParams.get('id');

    if (id === null) {
        error(404);

    } else {
        try {
            const wantedParty = await firestore.getWantedParty(id);
            console.log(`${url.origin}/SourceHanSans-VF.ttf`)
            const options: RenderOptions = {
                width: 1400,
                height: 700,
                props: {
                    wantedParty
                },
                fonts: [
                    {
                        name: 'NotoSansJP',
                        url: `https://ignis-tools.vercel.app/NotoSansJP-Regular.otf`,
                        weight: 400,
                        style: 'normal'
                    },
                    {
                        name: 'NotoSansJP',
                        url: `https://ignis-tools.vercel.app/NotoSansJP-Bold.otf`,
                        weight: 800,
                        style: 'normal'
                    }
                ]
            }

            // pass the component and options to the package
            const image = await image_from_component(WanterdPartyInfoOgp__SvelteComponent_, options)
            const response = new Response(image)
            response.headers.append('Content-Type', 'image/png')
            response.headers.append('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800')
            return response
        } catch (e) {
            console.error(e)
            throw error(500, 'Error trying to generate image from component.')
        }
    }



}) satisfies RequestHandler;