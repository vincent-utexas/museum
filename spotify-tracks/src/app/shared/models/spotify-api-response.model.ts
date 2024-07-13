// Used in the app for simplicity
export type SpotifyTracklist = TruncatedSpotifyTracklistResponse;
export type SpotifyTracklistItems = TruncatedSpotifyTracklistItemsResponse;

// Full versions are received by the backend and converted to truncated versions
// in spotify-api.service.ts

export type SpotifyTracklistResponse = SpotifyApiTracklistResponse | SpotifyApiDeniedResponse;
export type SpotifyTracklistItemsResponse = SpotifyApiTracklistItemsResponse | SpotifyApiDeniedResponse;

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

interface TruncatedSpotifyTracklistResponse {
    id: string | null,
    images: ImageObject[],
    name: string | null,
    type: "playlist",
    uri: string | null,
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

interface TruncatedSpotifyTracklistItemsResponse {
    items: PlaylistTrackObject[] | null,
}

interface ImageObject {
    url: string,
    height: number,
    width: number,
}

interface SimplifiedArtistObject {
    external_urls: {
        spotify: string },
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string,
}

interface ArtistObject {
    external_urls: {
        spotify: string, },
    followers: {
        href: string | null,
        total: number, },
    genres: string[],
    href: string,
    id: string,
    images: ImageObject[],
    name: string,
    popularity: number,
    type: "artist",
    uri: string,
}

interface SimplifiedTrackObject {
    artists: SimplifiedArtistObject[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_urls: {
        spotify: string },
    href: string,
    id: string,
    is_playable: boolean,
    linked_from: {
        external_urls: {
            spotify: string, },
        href: string,
        id: string,
        type: string,
        uri: string,
    },
    restrictions: {
        reason: string, },
    name: string,
    preview_url: string | null,
    track_number: number,
    type: 'track',
    uri: string,
    is_local: boolean,
}

interface TrackObject {
    album: AlbumObject,
    artists: ArtistObject[],
    available_markets: string,
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: {
        isrc: string,
        ean: string,
        upc: string, },
    external_urls: {
        spotify: string, },
    href: string,
    id: string,
    is_playable: boolean,
    linked_from: {},
    restrictions: {
        reason: 'market' | 'product' | 'explicit' | string, },
    name: string,
    popularity: number,
    preview_url: string | null,
    track_number: number,
    type: "track",
    uri: string,
    is_local: boolean
}

interface CopyrightObject {
    text: string,
    type: 'C' | 'P',
}

interface AlbumObject {
    album_type: 'album' | 'single' | 'compilation',
    total_tracks: number,
    available_markets: string[],
    external_urls: {
        spotify: string, },
    href: string,
    id: string,
    images: ImageObject[],
    name: string,
    release_date: string,
    release_date_precision: string,
    restrictions?: {
        reason: 'market' | 'product' | 'explicit' },
    type: 'album',
    uri: string,
    artists: SimplifiedArtistObject[],
    tracks: {
        href: string,
        limit: number,
        next: string | null,
        offset: number,
        previous: string | null,
        total: number,
        items: SimplifiedTrackObject[], },
    copyrights: CopyrightObject[],
    external_ids: {
        isrc: string,
        ean: string,
        upc: string, },
    genres: string[],
    label: string,
    popularity: number,
}

interface PlaylistTrackObject {
    added_at: string | Date | null,
    added_by: SpotifyUser | null,
    is_local: boolean,
    track: TrackObject,
}

interface SpotifyUser {
    external_urls: {
        spotify: string, },
    followers: {
        href: string | null,
        total: number, },
    href: string,
    id: string,
    type: "user",
    uri: string,
    display_name: string | null,
}