export type FieldName<T> = Extract<keyof T, string>
export type FieldNames<T> = FieldName<T>[] | FieldName<T>
