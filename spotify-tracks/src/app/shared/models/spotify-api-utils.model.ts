// Utility interfaces from Spotify Web API

export interface ImageObject {
    url: string,
    height: number,
    width: number,
}

export interface SimplifiedArtistObject {
    external_urls: {
        spotify: string },
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string,
}

export interface ArtistObject extends SimplifiedArtistObject {
    followers: {
        href: string | null,
        total: number, },
    genres: string[],
    images: ImageObject[],
    popularity: number,
    type: "artist",
}

export interface SimplifiedTrackObject {
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

export interface TrackObject {
    album: AlbumObject,
    artists: ArtistObject[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids?: {
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
    popularity?: number,
    preview_url: string | null,
    track_number: number,
    type: "track",
    uri: string,
    is_local: boolean
}

export interface CopyrightObject {
    text: string,
    type: 'C' | 'P',
}

export interface AlbumObject {
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

export interface PlaylistTrackObject {
    added_at: string | Date | null,
    added_by: SpotifyUser | null,
    is_local: boolean,
    track: TrackObject,
}

export interface SpotifyUser {
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