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
  recipients: [string];
  sender: string;
  receiver: string;
  productId: string;
  content: string;
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
  seller: string;
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
