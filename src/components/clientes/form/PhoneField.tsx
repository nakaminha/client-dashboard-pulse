
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PhoneFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const PhoneField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = '11 96123-4567'
}: PhoneFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex">
        <div className="w-20 flex items-center justify-center border rounded-l-md bg-gray-50">
          <span className="text-sm text-gray-500 flex items-center">
            <img src="https://flagsapi.com/BR/flat/24.png" alt="Brasil" className="mr-1" /> +55
          </span>
        </div>
        <Input
          id={id}
          name={name}
          type="tel"
          className="rounded-l-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PhoneField;
