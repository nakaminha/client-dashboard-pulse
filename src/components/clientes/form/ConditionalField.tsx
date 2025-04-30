
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import CheckboxField from './CheckboxField';

interface ConditionalFieldProps {
  id: string;
  checkboxLabel: string;
  fieldLabel: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const ConditionalField = ({
  id,
  checkboxLabel,
  fieldLabel,
  checked,
  onCheckedChange,
  value,
  onChange,
  name
}: ConditionalFieldProps) => {
  return (
    <div className="space-y-4">
      <CheckboxField
        id={id}
        label={checkboxLabel}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      
      {checked && (
        <div className="pl-6">
          <Label htmlFor={`${id}Value`}>{fieldLabel}:</Label>
          <Input
            id={`${id}Value`}
            name={name}
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

export default ConditionalField;
