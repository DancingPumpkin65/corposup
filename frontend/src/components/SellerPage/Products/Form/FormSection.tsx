import React from 'react';

export const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="p-4 border-t border-gray-200">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

export default FormSection;
