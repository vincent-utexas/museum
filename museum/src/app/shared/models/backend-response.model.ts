import { SpotifyTrackLike } from "./spotify-api-response.model";

export interface RecommendedTracksResponse {
    items: SpotifyTrackLike[]
}