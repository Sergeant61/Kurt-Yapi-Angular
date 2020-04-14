export class ApiResponse<T> {
  message: string;
  success: boolean;
  statusCode: number;
  data: T;

}
