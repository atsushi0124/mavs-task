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
  title: string;
}

export interface deleteResponse {
  user_id: Number;
  memo_id: Number;
}

export interface viewResponse {
  user_id: Number;
  memo_id: Number;
  title: string;
  content: string;
}
