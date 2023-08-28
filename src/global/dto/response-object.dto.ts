export class ResponseObjectDto<T> {
    private code: number;
    private msg: string;
    private result: T;

    constructor(code: number, msg: string, result: T) {
        this.code = code;
        this.msg = msg;
        this.result = result;
    }

    set Code(code: number) {
        this.code = code;
    }

    set Msg(msg: string) {
        this.msg = msg;
    }

    set Result(result: T) {
        this.result = result;
    }

    get Code(): number {
        return this.code;
    }

    get Msg(): string {
        return this.msg;
    }

    get Result(): T {
        return this.result;
    }
}
