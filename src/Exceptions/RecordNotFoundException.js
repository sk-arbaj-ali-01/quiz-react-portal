class RecordNotFoundException extends Error {
  constructor(message, code) {
    super(message); // Calls parent Error constructor
    this.name = this.constructor.name; // Identifies the error type
    this.code = code; // Adds custom property
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RecordNotFoundException); // Maintains stack trace
    }
  }
}

export default RecordNotFoundException;