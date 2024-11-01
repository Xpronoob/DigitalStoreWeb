import { Control, Controller, FieldError, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  error
}: Props<T>) => {
  return (
    <div className='form-group'>
      <label htmlFor={String(name)}>{label}</label>
      <Controller
        name={name as any}
        control={control}
        render={({ field }) => (
          <input
            id={String(name)}
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
