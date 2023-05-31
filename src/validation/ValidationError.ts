class ValidationError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super();
    this.code = code;
    super.message = message;
  }

  public getCode() {
    return this.code;
  }

  public getCodeAndMessage() {
    return { code: this.code, message: this.message };
  }
}

export default ValidationError;
