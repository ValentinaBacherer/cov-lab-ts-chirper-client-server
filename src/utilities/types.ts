// -> here I didn't know how to handle this
export interface ChirpsObject {
  nextid: number;
  [key: string]: SingleChirp | number;
}

export interface SingleChirp {
  id?: string;
  user?: string;
  text?: string;
  date?: string;
}
