interface AccessTokenSuccessResponse {
    status: number,
    access_token: string,
    refresh_token: string,
}

interface AccessTokenDeniedResponse {
    status: number,
    error: string,
}

export type AccessTokenResponse = AccessTokenSuccessResponse | AccessTokenDeniedResponse;