import { Control, Controller, FieldError, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues> {
  fieldKey: keyof T;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = <T extends FieldValues>({
  fieldKey,
  control,
  label,
  type,
  error
}: Props<T>) => {
  return (
    <div className='form-group'>
      <label htmlFor={String(fieldKey)}>{label}</label>
      <Controller
        name={fieldKey as any}
        control={control}
        render={({ field }) => (
          <input
            id={String(fieldKey)}
            type={type}
            {...field}
            className={`form-control ${error ? 'is-invalid' : ''}`}
          />
        )}
      />
      {error && <p className='error'>{error.message}</p>}
    </div>
  );
};

export default InputForm;
