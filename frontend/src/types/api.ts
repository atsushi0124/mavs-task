export interface SignInResponse {
  token: string;
  email: string;
  id: Number;
}

export interface AddMemoResponse {
  // token: string;
  title: string;
  content: string;
}

export interface getMemoResponse {
  id: Number;
}
