export type FieldError = {
  error: string;
  field: string;
};

//❗ Чтобы у нас не было пересечения имен наовем общий тип BaseResponseType
export type BaseResponse<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors: FieldError[];
};
