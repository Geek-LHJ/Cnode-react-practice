
export const fetchTopicData = async ({number = 300} = {}) => {
    return fetch(`https://cnodejs.org/api/v1/topics?&limit=${number}`).then(data=>data.json());
}
export const fetchDetailData = async (id) => {
    return fetch(`https://cnodejs.org/api/v1/topic/${id}`).then(data=>data.json());
}