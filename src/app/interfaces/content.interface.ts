import {ModelInterface} from './model.interface';

export interface ContentInterface extends ModelInterface{
  content: string;
  tags: string [];
  category: string;
}
