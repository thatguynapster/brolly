import React, { FC, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/outline";

const FAQ: FC = () => {
  return (
    <>
      <div className="w-full mx-auto bg-white rounded-2xl space-y-4">
        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>When is Brolly launching?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Brolly will launch in Ghana on January 5, 2022. We will announce on our social media channels as well as
                on traditional media channels when we begin.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>How many months can I pay for my insurance?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                You have options to pay in 3, 6, 9, or 12 monthly installments. Whatever is convenient for you, we will
                make it happen for you.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>My insurance is due in January. Can I register to use the Pay Monthly service now?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Yes, we are currently building a waitlist of the first 1000 people to benefit from the Pay Monthly
                service. We will pre-qualify the first 1000 ready to go. All the 1000 will receive incredible deals and
                gifts on launch.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>Will I have full insurance even when I sign up to pay monthly?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Yes, you will be fully insured just as when you’re paying your premium at once. You are fully protected
                from day 1 and you remain protected all through the period for as long as honour your installment
                payment obligation.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>Will I receive a full claim in case of an accident?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Yes, you will be paid a full claim in case of an accident. Remember that you are fully insured and you
                are entitled to all benefits and rights under the insurance policy.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>How and where will I pay my monthly installments?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Payments will be made through a monthly standing order with your bank. We may be able to offer standing
                orders through mobile money by the launch date as well. We do not accept cash payments.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>Do I need to come to your office to buy my insurance?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Not at all, we’re 100% digital. We use simple digital tools to make getting your insurance a breeze.
                Just sight tight and lets delight you.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>Is Brolly an insurance company?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Brolly is a digital insurance provider. Brolly policies are underwritten by the world’s largest
                insurance underwriter, Allianz.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>How do I make a claim for a policy purchased on Brolly?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Our claims process is as stress-free as our policy purchase process. You can complete your claim form
                online and submit all supporting documents online as well. We then pick up from there and process to get
                you settled with speed. We will get in touch if we need any additional evidence or clarification. From
                the moment you send us a claim notification, we will send you a clear timeline of when your claim
                processing would be completed.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>Is Brolly regulated by the National Insurance Commission?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Yes, Brolly is duly regulated as a digital insurance provider by the National Insurance Commission.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>Will the price of my insurance end up higher than if I were to pay outright at inception?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Brolly has a generous discounts and Cash-Back scheme which ensures that you do not pay more than paying
                outright.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>What digital channels does Brolly use in dealing with customers?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Customers can get answers the first time to 99% of their questions by contacting Brolly on whatsapp.
                Customers can choose to send a text or voice note. <br />
                <br />
                In addition to whatsapp, customers can send emails to{" "}
                <a className="text-dark font-semibold" href="mailto:hello@brollyinsurance.com">
                  hello@brollyinsurance.com
                </a>
                . We respond to all emails within 30 minutes from the time they hit our inbox. <br />
                <br />
                We can also set up calls over Zoom, Google Hangouts, or Microsoft Teams if clients prefer.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>What if I prefer to deal through a phone call?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Customers can call Brolly on{" "}
                <a className="text-dark font-semibold" href="tel:+233201335141">
                  +233 201 335 141
                </a>
                . The lines are open from 8am to 8pm, Monday to Sunday.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>Can I deal with Brolly in-person? </span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                We serve our customers more efficiently through our digital channels. Clients can book walk-in
                appointments by emailing to{" "}
                <a className="text-dark font-semibold" href="mailto:hello@brollyinsurance.com">
                  hello@brollyinsurance.com
                </a>
                . Please note that you can always get help quicker through whatsapp, email, or a phone call than through
                a walk-in appointment.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>Where is Brolly’s office?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                Our Ghana office is at 19 Kofi Annan Street, Airport Residential Area, Accra. We also have a distributed
                team of professionals who work in different locations around the world.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>How will I receive my policy document and sticker from Brolly?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                As soon as your insurance is concluded, you would receive a digital copy of your documents through your
                email and on whatsapp. You could print them and they are as good as a copy printed from our offices. You
                will also receive an SMS to confirm that you have been entered onto the Motor Insurance Database. <br />
                <br />
                If you require a printed copy from us, we could deliver to you but you will pay the dispatch rider’s
                fee.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>What if I miss a monthly installment? Do I remain insured?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                It is advisable to inform us at least 7 days in advance if you are likely to miss your monthly
                installment. We will give you up to 14 days grace period from the due date of your installment to make
                payment. <br />
                <br />
                You will incur a 5% fee on the missed payment when you pay within the 14 days grace period. Beyond the
                14 days, you have a further 14 days extended window within which to settle your payment, failing which
                your insurance would be suspended. Payment made within the second 14 days window attracts a fee of 10%
                of the missed payment. <br />
                <br />
                If we need to suspend your insurance, we would take your name off the Motor Insurance Database.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-900 ${
                  open ? "bg-primary-surface" : "bg-gray-50"
                } rounded-lg hover:bg-primary-surface focus:outline-none focus-visible:ring focus-visible:ring-primary-border focus-visible:ring-opacity-75`}
              >
                <span>Why should I choose Brolly?</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                We prefer to answer that by asking whether you are satisfied with what you are getting with your current
                insurer. In 95% of the time, people are getting a bad haircut from their current insurer. We are in the
                market for exactly that reason: to redefine insurance service standards in Africa.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default FAQ;
