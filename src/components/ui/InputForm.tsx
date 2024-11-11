import { Control, Controller, FieldError, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues> {
  fieldKey: keyof T;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
  disabled?: boolean;
}

const InputForm = <T extends FieldValues>({
  fieldKey,
  control,
  label,
  type,
  error,
  disabled = false
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
            checked={type === 'checkbox' ? field.value : undefined}
            value={
              type === 'number' && field.value != null
                ? field.value.toString()
                : field.value ?? ''
            }
            onChange={(e) => {
              const value = e.target.value;
              if (type === 'number') {
                field.onChange(Number(value));
              } else if (type === 'checkbox') {
                field.onChange(e.target.checked);
              } else {
                field.onChange(value);
              }
            }}
            className={`form-control ${
              error ? 'is-invalid' : ''
            } dark:bg-gray-800 m-1 p-1 ${
              disabled ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
            disabled={disabled}
          />
        )}
      />

      {error && <p className='error'>{error.message}</p>}
    </div>
  );
};

export default InputForm;
