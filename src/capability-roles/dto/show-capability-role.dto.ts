export class ShowCapabilityRoleDto {
    private id: number;

    private name: string;

    private description: string;

    private created_at: Date;

    private updated_at: Date;

    private deleted_at: Date | null;

    constructor() {}

    set Id(id: number) {
        this.id = id;
    }

    set Name(name: string) {
        this.name = name;
    }

    set Description(description: string) {
        this.description = description;
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

    get Id(): number {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }

    get Description(): string {
        return this.description;
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
