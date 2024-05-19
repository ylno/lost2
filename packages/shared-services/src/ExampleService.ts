// src/ExampleService.ts
export class ExampleService {
  public getData(): string {
    return "Hello from Shared Services!";
  }
}

export const exampleService = new ExampleService();
