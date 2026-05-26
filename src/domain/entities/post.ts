

export type Link = {
  title: string;
  url: string;
}

export class Post {

  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private _content: string,
    private _media: string[] = [],
    private _links: Link[] = [],
    private _mentions: string[] = [],
    private _hashtags: string[] = [],
    private readonly _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date()
  ) {}



  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get content(): string {
    return this._content;
  }

  get media(): string[] {
    return this._media;
  }

  get links(): Link[] {
    return this._links;
  }

  get mentions(): string[] {
    return this._mentions;
  }

  get hashtags(): string[] {
    return this._hashtags;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}