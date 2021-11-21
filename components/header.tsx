

export default function Header() {
  return (
    <header className="relative bg-white max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center md:justify-between items-center md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              {/* <span className="sr-only">Workflow</span> */}
              <img
                className="h-20 w-auto sm:h-28"
                src="/img/logo.svg"
                alt=""
              />
            </a>
          </div>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-8">
            <a href="#" className="whitespace-nowrap text-base font-medium hover:text-gray-900 bg-primary-main py-4 px-6 border-0 shadow-sm">
              Get a Quote
            </a>
            <a
              href="#"
              className="whitespace-nowrap inline-flex items-center justify-center py-4 px-6 border border-transparent shadow-sm text-base font-medium bg-background"
            >
              24/7 support
            </a>
          </div>
        </div>
    </header>
  );
}
