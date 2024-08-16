import { ImageObject, PlaylistTrackObject, TrackObject, SpotifyUser, SimplifiedTrackObject, SimplifiedArtistObject, AlbumObject, RecommendationSeedObject } from "./spotify-api-utils.model";

// Full versions are received by the backend and converted to truncated versions
// in spotify-api.service.ts
export type SpotifyTracklistMetadataResponse = SpotifyTracklistMetadataFull | SpotifyApiDeniedResponse;
export type SpotifyTracklistResponse = SpotifyApiTracklistResponseFull | SpotifyApiDeniedResponse;

// Compact versions used in the app
export interface SpotifyTracklistMetadata {
    id: string,
    images: ImageObject[],
    name: string,
    uri: string,
}

export interface SpotifyTracklist {
    items: PlaylistTrackObject[] // s| SimplifiedTrackObject[],
}

export interface SpotifyTrackLike {
    id: string,
    image_url: string,
    name: string,
    spotify_url: string 
}

export interface SpotifyRecommendations {
    seeds: RecommendationSeedObject[],
    tracks: TrackObject[]
}

export interface SpotifyTrack extends SpotifyTrackLike {
    preview_url: string | null,
    artist_name: string,
    artist_id: string, // artists: SimplifiedArtistObject[],
    album_name: string, 
    album_id: string,
    album_popularity: number, // album: AlbumObject
    rank: number,
    href: string,
}

export interface SpotifyApiRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    headers: {
        'Authorization': string,
    }
}

interface SpotifyApiDeniedResponse {
    error: {
        status: number,
        message: string,
    }
}

// Full versions are received by the backend
interface SpotifyTracklistMetadataFull extends SpotifyTracklistMetadata {
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

interface SpotifyApiTracklistResponseFull extends SpotifyTracklist {
    href: string,
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
    items: PlaylistTrackObject[],
}