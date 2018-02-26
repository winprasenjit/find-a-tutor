import { IPost } from './iPost';
export class Post implements IPost{
    constructor(public title, public description, public price,
        public image, public contact){}
}
