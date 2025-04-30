
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  rightAddon?: React.ReactNode;
  helpText?: string;
}

const FormField = ({
  id,
  name,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder = '',
  rightAddon,
  helpText
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}{helpText && <span className="ml-2 text-xs text-gray-500">{helpText}</span>}</Label>
      {rightAddon ? (
        <div className="relative">
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
          />
          <span className="text-xs text-gray-500 absolute right-3 top-3">{rightAddon}</span>
        </div>
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
