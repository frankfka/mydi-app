export default interface Result<T> {
  error?: unknown;
  data?: T;
}
