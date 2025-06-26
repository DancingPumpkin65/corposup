import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface DropdownMenuRadioItemProps {
  value: string;
  children: React.ReactNode;
}

interface DropdownMenuLabelProps {
  children: React.ReactNode;
}

interface DropdownMenuGroupProps {
  children: React.ReactNode;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface DropdownMenuSubProps {
  children: React.ReactNode;
}

interface DropdownMenuSubTriggerProps {
  children: React.ReactNode;
}

interface DropdownMenuSubContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuPortalProps {
  children: React.ReactNode;
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedValue: string;
  onValueChange: (value: string) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
  selectedValue: '',
  onValueChange: () => {},
});

const DropdownMenuSubContext = React.createContext<{
  isSubOpen: boolean;
  setIsSubOpen: (open: boolean) => void;
}>({
  isSubOpen: false,
  setIsSubOpen: () => {},
});

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ 
      isOpen, 
      setIsOpen, 
      selectedValue, 
      onValueChange: setSelectedValue 
    }}>
      <div className="relative" ref={dropdownRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children }) => {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children, className = '' }) => {
  const { isOpen } = React.useContext(DropdownMenuContext);

  if (!isOpen) return null;

  return (
    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-[99999] ${className}`}>
      {children}
    </div>
  );
};

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({ children }) => {
  return (
    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
      {children}
    </div>
  );
};

export const DropdownMenuSeparator: React.FC = () => {
  return <div className="border-t border-gray-200 my-1" />;
};

export const DropdownMenuRadioGroup: React.FC<DropdownMenuRadioGroupProps> = ({ 
  value, 
  onValueChange, 
  children 
}) => {
  const context = React.useContext(DropdownMenuContext);

  React.useEffect(() => {
    context.onValueChange(value);
  }, [value, context]);

  return (
    <DropdownMenuContext.Provider value={{
      ...context,
      selectedValue: value,
      onValueChange
    }}>
      <div className="py-1">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuRadioItem: React.FC<DropdownMenuRadioItemProps> = ({ 
  value, 
  children 
}) => {
  const { selectedValue, onValueChange, setIsOpen } = React.useContext(DropdownMenuContext);
  const isSelected = selectedValue === value;

  const handleClick = () => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <div
      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${
        isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
      }`}
      onClick={handleClick}
    >
      <div className={`w-2 h-2 rounded-full border ${
        isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
      }`} />
      {children}
    </div>
  );
};

export const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = ({ children }) => {
  return <div className="py-1">{children}</div>;
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ 
  children, 
  onClick, 
  disabled = false 
}) => {
  const { setIsOpen } = React.useContext(DropdownMenuContext);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'text-gray-700'
      }`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export const DropdownMenuSub: React.FC<DropdownMenuSubProps> = ({ children }) => {
  const [isSubOpen, setIsSubOpen] = useState(false);

  return (
    <DropdownMenuSubContext.Provider value={{ isSubOpen, setIsSubOpen }}>
      <div className="relative" onMouseLeave={() => setIsSubOpen(false)}>
        {children}
      </div>
    </DropdownMenuSubContext.Provider>
  );
};

export const DropdownMenuSubTrigger: React.FC<DropdownMenuSubTriggerProps> = ({ children }) => {
  const { setIsSubOpen } = React.useContext(DropdownMenuSubContext);

  return (
    <div
      className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center justify-between text-gray-700"
      onMouseEnter={() => setIsSubOpen(true)}
    >
      <span>{children}</span>
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  );
};

export const DropdownMenuPortal: React.FC<DropdownMenuPortalProps> = ({ children }) => {
  return <>{children}</>;
};

export const DropdownMenuSubContent: React.FC<DropdownMenuSubContentProps> = ({ 
  children, 
  className = '' 
}) => {
  const { isSubOpen } = React.useContext(DropdownMenuSubContext);

  if (!isSubOpen) return null;

  return (
    <div className={`absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-md shadow-lg z-[99999] min-w-[200px] ${className}`}>
      {children}
    </div>
  );
};