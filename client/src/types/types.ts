export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  location: string;
  adresse: string;
}

export interface IMessage {
  buyer: string;
  seller: IUser;
  listingId: IListing;
  body: string;
}

export interface IListing {
  _id: string;
  headline: string;
  institution: string;
  size: string;
  condition: string;
  gender: string;
  type: string;
  description: string;
  price: number;
  seller: IUser;
}

export interface IListingForm {
  headline?: string;
  institution?: string;
  size?: string;
  condition?: string;
  gender?: string;
  type?: string;
  description?: string;
  price?: number;
  seller?: string;
}
