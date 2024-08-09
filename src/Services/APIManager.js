


export const fetchData = async () => {
    const TOKEN = 'cqt_rQ4rjPvbKdDRJCTVHyDWxdhH4hPp';
    const CONTRACT_ADDRESS = '0x8821bee2ba0df28761afff119d66390d594cd280';
    const PAGE = 1;
    const PAGE_SIZE = 10;
    const url = `https://api.covalenthq.com/v1/eth-mainnet/nft/${CONTRACT_ADDRESS}/metadata/?page-size=${PAGE_SIZE}&page-number=${PAGE}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }
        });

        if (!response.ok) {
        console.log("--------NOT Ok--------",response.status)
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("--------API--------", data)
        return data
    } catch (err) {

        return false;
    }
};