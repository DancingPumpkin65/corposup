import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/Shadcn/Select/select";

interface TopBarProps {
  currency: string;
  setCurrency: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
}

const TopBar = ({ currency, setCurrency, language, setLanguage }: TopBarProps) => {
  return (
    <div className="bg-blue-600 w-full">
      <div className="max-w-[1580px] mx-auto flex justify-between items-center px-2 lg:px-8">
        <div className="flex w-full justify-between items-center py-2">
          <div className="flex flex-row items-center text-white text-xs sm:text-sm space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd"></path>
              </svg>
              <span className="text-[13px] leading-none font-medium tracking-wider">+212 661 368 103</span>
            </div>

            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"></path>
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"></path>
              </svg>
              <span className="text-[13px] leading-none font-medium tracking-wider">contact@corposup.com</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 ml-2 sm:ml-4">
            {/* Currency */}
            <div className="relative border-0 md:border-r-2 pr-0 md:pr-6">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-[90px] border-0 text-white text-sm hover:bg-blue-700 focus:ring-0 focus:ring-offset-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="min-w-[90px]">
                  <SelectGroup>
                    <SelectLabel>Devise</SelectLabel>
                    <SelectItem value="dh">MAD</SelectItem>
                    <SelectItem value="usd">US $</SelectItem>
                    <SelectItem value="eur">EU €</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Language */}
            <div className="relative border-0 md:border-r-2 pr-0 md:pr-6">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[70px] border-0 text-white text-sm hover:bg-blue-700 focus:ring-0 focus:ring-offset-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="min-w-[70px] translate-x-1">
                  <SelectGroup>
                    <SelectLabel>Langue</SelectLabel>
                    <SelectItem value="fr">FR</SelectItem>
                    <SelectItem value="en">EN</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Socials - Hidden on all screens below 1280px (xl breakpoint) */}
            <div className="hidden xl:flex items-center space-x-3">
              <a href="https://web.facebook.com/share/r/1BH6bRUzNT/" className="pl-2" target="new">
                <svg className="w-[18px] h-[18px] text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/corposup" target="new">
                <svg className="w-[17px] h-[17px] text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M20.45 20.45h-3.4v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.691V9h3.264v1.562h.046c.455-.861 1.564-1.766 3.22-1.766 3.444 0 4.079 2.267 4.079 5.218v6.436zM5.337 7.433a1.968 1.968 0 01-1.97-1.97c0-1.087.883-1.97 1.97-1.97s1.97.883 1.97 1.97a1.97 1.97 0 01-1.97 1.97zm1.7 13.017h-3.4V9h3.4v11.45zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/corposup/" target="new">
                <svg className="w-[21px] h-[21px] text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
