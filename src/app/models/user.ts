export class User {
    public id: string;
    public name: string;
    public email: string;
    public expiration: Date;
    public token: string;

    constructor(obj?: any) {
        this.id = obj && obj.id;
        this.name = obj && obj.name;
        this.email = obj && obj.email;
        this.expiration = obj && obj.expiration;
        this.token = obj && obj.token;
    }
}
