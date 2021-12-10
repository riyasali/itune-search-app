

export const removeDuplicateAlbums = (data, prop) => {
    return data.filter((obj, pos, arr) => {
        return data.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}