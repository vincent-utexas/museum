import { ImageObject, PlaylistTrackObject, TrackObject, SpotifyUser } from "./spotify-api-util.model";

// Full versions are received by the backend and converted to truncated versions
// in spotify-api.service.ts
export type SpotifyTracklistResponse = SpotifyApiTracklistResponse | SpotifyApiDeniedResponse;
export type SpotifyTracklistItemsResponse = SpotifyApiTracklistItemsResponse | SpotifyApiDeniedResponse;

// Compact versions used in the app
export interface SpotifyTracklistMetadata {
    id: string,
    images: ImageObject[],
    name: string,
    type: "playlist",
    uri: string,
}

export interface SpotifyTracklist {
    items: PlaylistTrackObject[],
}

export interface SpotifyTrack extends TrackObject {
    rank: number,
}

interface SpotifyApiDeniedResponse {
    error: {
        status: number,
        message: string,
    }
}

// Full versions are received by the backend
interface SpotifyApiTracklistResponse {
    collaborative: boolean,
    description: string | null,
    external_urls: {
        spotify: string, },
    followers: {
        href: string | null,
        total: number, },
    href: string,
    id: string,
    images: ImageObject[],
    name: string,
    owner: SpotifyUser,
    public: boolean,
    snapshot_id: string,
    tracks: {
        href: string,
        limit: number,
        next: string | null,
        offset: number,
        previous: string | null,
        total: number,
        items: PlaylistTrackObject[], },
    type: "playlist",
    uri: string,
}

interface SpotifyApiTracklistItemsResponse {
    href: string,
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
    items: PlaylistTrackObject[],
}