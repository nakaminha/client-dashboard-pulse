
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextareaFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  helpText?: string;
  description?: string;
  minHeight?: string;
}

const TextareaField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = '',
  helpText,
  description,
  minHeight = '120px'
}: TextareaFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {helpText && <span className="ml-2 text-xs text-gray-500">{helpText}</span>}
      </Label>
      <Textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`min-h-[${minHeight}]`}
      />
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
};

export default TextareaField;
