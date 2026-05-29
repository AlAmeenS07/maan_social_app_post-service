import { messages } from "../../presentation/constants/messages";
import { statusCodes } from "../../presentation/constants/status.codes";
import { AppError } from "../../presentation/middlewares/error.middleware";
import { extractHashtags } from "../../shared/helpers/extract.hashtags";
import { CreatePostParams } from "../types/post";

export class Post {

  private _id?: string;

  private _userId: string;

  private _content: string;

  private _media: string[];

  private _hashtags: string[];

  private _isListed: boolean;

  private _isDeleted: boolean;

  private _createdAt: Date;

  private _updatedAt: Date;

  constructor(params: CreatePostParams) {

    this.validatePost(params);

    this._id = params.id;

    this._userId = params.userId;

    this._content = (params.content as string).trim();

    this._media = params.media || [];

    this._hashtags = extractHashtags(this._content);

    this._isListed = params.isListed ?? true;

    this._isDeleted = params.isDeleted ?? false;

    this._createdAt = params.createdAt || new Date();

    this._updatedAt = params.updatedAt || new Date();
  }


  get id(): string | undefined {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get content(): string {
    return this._content;
  }

  get media(): string[] {
    return [...this._media];
  }

  get hashtags(): string[] {
    return [...this._hashtags];
  }

  get isListed(): boolean {
    return this._isListed;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateContent(content: string): void {

    if (!content || !content.trim()) {
      throw new AppError(messages.POST_CONTENT_REQUIRED, statusCodes.BAD_REQUEST);
    }

    this._content = content.trim();

    this._hashtags = extractHashtags(
      this._content
    );

    this.touch();
  }

  updateMedia(media: string[]): void {

    this._media = media;

    this.touch();
  }

  softDelete(): void {

    if (this._isDeleted) {
      throw new AppError(messages.POST_ALREADY_DELETED, statusCodes.BAD_REQUEST);
    }

    this._isDeleted = true;

    this._isListed = false;

    this.touch();
  }

  restore(): void {

    if (!this._isDeleted) {
      throw new AppError(messages.POST_NOT_DELETED, statusCodes.BAD_REQUEST);
    }

    this._isDeleted = false;

    this._isListed = true;

    this.touch();
  }


  private touch(): void {

    this._updatedAt = new Date();
  }

  private validatePost(params: CreatePostParams): void {

    if (!params.content || !params.content.trim()) {
      throw new AppError(messages.POST_CONTENT_REQUIRED, statusCodes.BAD_REQUEST);
    }
  }


  toJSON() {

    return {
      id: this._id,
      userId: this._userId,
      content: this._content,
      media: this._media,
      hashtags: this._hashtags,
      is_listed: this._isListed,
      is_deleted: this._isDeleted,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
}