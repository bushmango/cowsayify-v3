import * as midboss from 'midboss';
const midbossKey = 'history';
export { midbossKey };
import fetch from 'isomorphic-unfetch';
const host = process.env.host;
let initialState = {
    fetchedHistory: null,
};
const stateManager = midboss.createMidboss(midbossKey, '1.0.0', initialState, {
    useLocalStorage: false,
});
export { stateManager };
export async function fetchHistory() {
    const res = await fetch(host + '/cows-list');
    const fetchedHistory = await res.json();
    stateManager.produce(draftState => {
        draftState.fetchedHistory = fetchedHistory;
    });
}
//# sourceMappingURL=stateHistory.js.map