export interface TokenRequest extends Record<string, string> {
    grant_type: 'authorization_code',
    code: string,
    redirect_uri: string,
    client_id: string,
    code_verifier: string,
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