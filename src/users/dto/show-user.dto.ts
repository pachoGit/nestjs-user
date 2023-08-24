export class ShowUserDto {
    private id: number;

    private firstname: string;

    private lastname: string;

    private email: string;

    private phone: string;

    private status: number;

    private created_at: Date;

    private updated_at: Date;

    private deleted_at: Date | null;

    constructor() {}

    set Id(id: number) {
        this.id = id;
    }

    set Firstname(firstname: string) {
        this.firstname = firstname;
    }

    set Lastname(lastname: string) {
        this.lastname = lastname;
    }

    set Email(email: string) {
        this.email = email;
    }

    set Phone(phone: string) {
        this.phone = phone;
    }

    set Status(status: number) {
        this.status = status;
    }

    set CreatedAt(created_at: Date) {
        this.created_at = created_at;
    }

    set UpdatedAt(updated_at: Date) {
        this.updated_at = updated_at;
    }

    set DeletedAt(deleted_at: Date | null) {
        this.deleted_at = deleted_at;
    }

    get Firstname(): string {
        return this.firstname;
    }

    get Lastname(): string {
        return this.lastname;
    }

    get Id(): number {
        return this.id;
    }

    get Email(): string {
        return this.email;
    }

    get Phone(): string {
        return this.phone;
    }

    get Status(): number {
        return this.status;
    }

    get CreatedAt(): Date {
        return this.created_at;
    }

    get UpdateAt(): Date {
        return this.updated_at;
    }

    get DeleteAt(): Date | null {
        return this.deleted_at;
    }
}
