export interface User {
  _id: string;
  role: string;
  displayName: string;
  avatar:string | null,
  username: string;
  password: string;
  token: string;
}

export interface GalleryCreate {
  title: string;
  image: File | null;
}

export interface Gallery {
  _id: string;
  user: {
    displayName: string;
    role:string;
    _id: string;
  };
  title: string;
  image: string;
}

export interface Register {
  username: string;
  password: string;
  displayName: string;
  avatar:File | null
}


export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}