interface TokenRequest {
    grant_type: 'authorization_code' | 'refresh_token',
    client_id: string,
}

export interface AccessTokenRequest extends TokenRequest, Record<string, string> {
    code: string,
    redirect_uri: string,
    code_verifier: string,
}

export interface RefreshTokenRequest extends TokenRequest, Record<string, string> {
    refresh_token: string,
}

export interface RequestPayload {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: URLSearchParams,
}

interface TokenSuccessResponse {
    access_token: string,
    refresh_token: string,
    token_type: "Bearer",
    expires_in: 3600,
    scope: string,
}

interface TokenDeniedResponse {
    status: number,
    error: string,
}

export type TokenResponse = TokenSuccessResponse | TokenDeniedResponse;