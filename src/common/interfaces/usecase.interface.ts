/**
 * The use-case interface
 */
export interface IUseCase<T> {
  invoke(...params: any): Promise<T>;
}
