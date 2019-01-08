export class User {
    public id: string;
    public name: string;
    public email: string;
    public expiration: Date;
    public token: string;

    constructor(obj?: any) {
        this.id = obj.id;
        this.name = obj.name;
        this.email = obj.email;
        this.expiration = obj.expiration;
        this.token = obj.token;
    }

}
