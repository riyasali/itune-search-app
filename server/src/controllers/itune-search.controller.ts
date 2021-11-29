import { Response, NextFunction } from 'express';
import axios from 'axios';
import { BASE_API_URL } from '../config';
import { removeDuplicateAlbums } from '../utils/album-filter';

export default class ItunesController {
    public async search(req: any, res: Response, next: NextFunction) {
        try {
            const validArtistNamePattern = /^[A-Za-z\s\0-9]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/g;
            if (req.params && req.params.artist && req.params.artist.match(validArtistNamePattern)) {
                const artist = decodeURIComponent(req.params.artist).split(' ').join('+');
                console.log(artist)
                const response = await axios.get(`${BASE_API_URL}?term=${artist}&entity=album&attribute=allArtistTerm&limit=200`);
                const responseData = {
                    resultCount: response.data.resultCount,
                    results: removeDuplicateAlbums(response.data.results, 'collectionId'),
                    message: response.data.resultCount > 0 ? 'Albums retrieved successfully' : `No Albums found for the Artist - ${req.params.artist}`
                };
                res.status(200).json(responseData);
            } else {
                res.status(400).json({
                    message: 'Bad Request. Invalid artist name'
                });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}