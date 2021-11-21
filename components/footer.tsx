export default function Footer() {
  return (
    <footer className="bg-dark px-7 py-16 mb-[74px] md:mb-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row space-y-16 md:space-y-0">
        <div className="w-full md:w-2/3 text-white flex flex-col space-y-10">
          <div className="space-y-3">
            <a href="/">
              <img className="w-1/4 md:w-1/12" src="/img/logo-footer.svg" alt="Logo Footer" />
            </a>
            <p className="flex flex-wrap items-start space-x-6">
              <a className="mr-3" href="#">
                Who we are
              </a>
              <a className="mr-3" href="#">
                FAQs
              </a>
            </p>
            <p className="flex flex-wrap items-start space-x-6">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms &amp; Conditions</a>
              <a className="hidden md:flex" href="#">
                Cookies Policy
              </a>
            </p>
            <p className="flex flex-wrap items-start justify-between md:hidden">
              <a href="#">Cookies Policy</a>
            </p>
          </div>

          <p className="text-small mt-8"> &copy; 2021 Brolly. All rights reserved</p>

          <div className="flex flex-row space-x-4">
            <a className="mr-3" href="#">
              <img className="w-8 h-8 m-2" src="/icons/instagram.svg" alt="Instagram Page Link" />
            </a>
            <a className="mr-3" href="#">
              <img className="w-8 h-8 m-2" src="/icons/twitter.svg" alt="Twitter Link" />
            </a>
            <a className="mr-3" href="#">
              <img className="w-8 h-8 m-2" src="/icons/youtube.svg" alt="Youtube Link" />
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/3 text-white flex flex-col space-y-6">
          <h4 className="text-[20px] leading-[30px] text-white">Reach us</h4>

          <div className="flex flex-row items-center space-x-4 text-white">
            <img className="w-5" src="/icons/mail.svg" alt="Message" />
            <p className="font-semibold font-headings text-sm">team@brollyinsurance.com</p>
          </div>

          <div className="flex flex-row items-center space-x-4 text-white">
            <img className="w-5" src="/icons/phone.svg" alt="Message" />
            <p className="font-semibold font-headings text-sm">+233 201 335 141</p>
          </div>

          <div className="flex flex-row items-center space-x-4 text-white">
            <img className="w-5" src="/icons/location.svg" alt="Message" />
            <p className="font-semibold font-headings text-sm">
              No. 19 Kofi Annan Street, Airport <br />
              Residential Area. Accra, Ghana
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
