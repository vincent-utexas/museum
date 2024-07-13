interface AccessTokenSuccessResponse {
    status: number,
    access_token: string,
    refresh_token: string,
}

interface RefreshTokenSuccessResponse {
    access_token: string,
    expires_in: 3600,
    refresh_token: string,
}

interface TokenDeniedResponse {
    status: number,
    error: string,
}

export type AccessTokenResponse = AccessTokenSuccessResponse | TokenDeniedResponse;
export type RefreshTokenResponse = RefreshTokenSuccessResponse | TokenDeniedResponse;