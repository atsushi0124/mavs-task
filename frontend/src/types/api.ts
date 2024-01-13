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

export interface getResponse {
  memoId: Number;
  _rawValue: string;
  title: string;
}

export interface deleteResponse {
  user_id: Number;
  memo_id: Number;
}
