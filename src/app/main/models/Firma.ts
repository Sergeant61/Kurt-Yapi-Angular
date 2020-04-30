export class Firma {
  _id: string;
  name: string;
  createdAt: Date;

  constructor(id?: string, name?: string) {
    this._id = id;
    this.name = name;
  }

}
