const SAVE_KEY = "GENSO-FRIEND-LAST-SEEN-TIME";


export const updateLastSeenTime = (id: string) => {
    const json = localStorage.getItem(SAVE_KEY);

    let data: { [id: string]: number } = {};
    if (json) {
        data = JSON.parse(json);
    }

    data[id] = new Date().getTime();

    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export const getLastSeenTime = (id: string): number => {
    const json = localStorage.getItem(SAVE_KEY);

    let data: { [id: string]: number } = {};
    if (json) {
        data = JSON.parse(json);
    }

    return data[id] ?? 0;
}