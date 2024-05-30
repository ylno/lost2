/**
 * Exampleservice
 */
export class ExampleService {
  public getData(): string {
    return "Hello from Shared Services!!";
  }
}

export const exampleService = new ExampleService();
