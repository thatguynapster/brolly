import { ChevronLeftIcon } from "@heroicons/react/outline";
import moment from "moment";
import Link from "next/link";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import { mkPostReq } from "../../utils/functions";

const AgreementForm: FC<{
  policy: any;
  onReturn?: () => void;
  onProceed: () => void;
}> = ({ policy, onReturn, onProceed }) => {
  // console.log(policy);

  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const { GLOBAL_OBJ } = useContext(AuthContext);

  const _acceptAgreement = async () => {
    // console.log("accepting agreement...");

    if (!acceptTerms) {
      toast.error("You need to accept the terms to proceed");
      return;
    }

    // toast.info("Updating Quote Information...");
    let acceptance_data = {
      fullName: `${policy.firstName} ${policy.lastName}`,
      initialDeposit: policy.initialDeposit,
      monthlyInstallment: policy.monthlyInstallment,
      noOfInstallments: policy.noOfInstallments,
      startDate: moment(policy.startDate).format("DD-MM-YYYY"),
      endDate: moment(policy.startDate)
        .subtract("days", 1)
        .format("DD-MM-YYYY"),
    };
    // console.log(acceptance_data);

    try {
      let accept_agreement_response = await mkPostReq({
        endpoint: `/api/insurances/insurance-payment-agreement/${policy.id}`,
        queries: "",
        method: "post",
        token: GLOBAL_OBJ.token,
        isJSON: true,
        data: JSON.stringify(acceptance_data),
      });
      // console.log(accept_agreement_response);

      if (accept_agreement_response.httpStatus) {
        toast.error(accept_agreement_response.title);
      } else {
        // handle success
        onProceed();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    // console.log(policy);

    return () => {
      mounted = false;
    };
  }, [policy]);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      <button
        className="px-3 py-1 text-gray-700 border border-primary-border flex flex-row items-center justify-center space-x-8 hover:bg-primary-main hover:text-dark rounded-md"
        onClick={onReturn}
      >
        <ChevronLeftIcon className="w-4 h-4" /> Back
      </button>

      <div className="w-full py-4 flex flex-col items justify-center space-y-8">
        <div className="w-full flex flex-row space-x-4 items-center justify-center">
          <hr className="md:w-full text-gray-700 bg-gray-700" />
          <h1 className="w-max md:whitespace-nowrap text-center font-bold text-lg capitalize">
            insurance price installment payment agreement
          </h1>
          <hr className="md:w-full text-gray-700 bg-gray-700" />
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                1.0 Preamble
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
          </div>
          <p>
            This agreement is made and concluded on the date it is agreed to by
            a person who has opted to pay for their yearly insurance price on an
            installment basis who shall, for the purposes of this agreement, be
            referred to simply as &quot;Subscriber&quot; and Brolly Services
            Limited who shall be referred to simply As Brolly.
          </p>
          <p>
            The purpose of the agreement is to set out the terms and conditions
            as well as obligations regarding Brolly&apaos;s installment payment
            arrangement which is titled &quot;Pay Monthly Insurance
            Scheme&quot;. For the avoidance of doubt, Brolly&apaos;s Pay Monthly
            Insurance Scheme allows persons to pay the yearly price of their
            insurance on a monthly installment basis to Brolly while Brolly
            (either directly or through one of its financing partners) pays the
            full yearly price for the insurance period upfront to the
            underwriting company on behalf of the subscriber.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                2.0 payment obligation
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
          </div>
          <p>
            The subscriber agrees to make monthly installment payments on agreed
            dates and for the agreed period, and to observe all other
            obligations regarding the Pay Monthly Insurance Scheme as set out in
            this agreement. The agreed monthly installment and period appear as
            Schedule A to this agreement.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                3.0 initial payment
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
          </div>
          <p>
            The Pay Monthly Insurance Scheme is subject to a proposer being
            accepted for the proposed insurance cover by the partner
            underwriting company.
          </p>
          <p>
            Upon completion of the proposal for the Pay Monthly Insurance Scheme
            (the offer) by the subscriber, the proposer shall make an initial
            payment to Brolly for consideration. The initial payment shall be
            determined as a percentage of the total yearly price and shall count
            towards settling the full yearly price for the subscriber&apos;s
            insurance. <br />
            If Brolly agrees to provide the Pay Monthly Insurance Scheme service
            to the subscriber, the offer shall be deemed accepted. In case
            Brolly rejects the proposal for any reason, the full initial payment
            made by the subscriber shall be refunded without deduction by
            Brolly.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                Missed Payments and Grace Periods
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
          </div>
          <p>
            Subscribers will have different grace periods to make missed
            payments depending on their employer type, possibility of payroll
            deduction, and their mode of monthly installment payment.
          </p>

          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize ml-6">
              &bull; payroll deduction
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>
          <p>
            Where a subscriber&apos;s employer permits payroll deductions and
            the subscriber has signed an irrevocable payroll deduction mandate,
            the following grace periods shall apply unless Brolly decides
            otherwise.
          </p>
          <p>
            <span className="ml-12"> - Amber Period</span> <br /> Where (a) a
            subscriber has an irrevocable payroll deduction mandate, (b) the
            subscriber&apos;s monthly installments are being deducted from their
            bank account, (c) one monthly installment deduction from the bank
            returns with no deduction for any reason: the subscriber shall have
            a period of up to 30 days to make the missed payment. The subscriber
            shall pay an additional fee of 10% of the missed installment to
            cover administration costs. The client will enjoy full protection
            under the insurance cover selected. This period is referred to as
            the Amber period. During this period, Brolly may convert the
            subscriber&apos;s mode of monthly payment to payroll deduction and
            the subscriber agrees that the 10% administration fee shall be
            deducted in addition to the monthly installment payments.
          </p>
          <p>
            <span className="ml-12"> - Red Period </span> <br /> If a subscriber
            does not make the missed payment within 30 days of the Amber period,
            (s)he shall be deemed to have entered the Red grace period except
            where the mode of monthly payment has been successfully changed to
            payroll deduction. Where the change to payroll deduction has not
            been successful for any reason or where payroll deduction cannot
            commence within the next payroll period, the protection under the
            subscriber&apos;s insurance coverage may be downgraded to Third
            Party Only Cover provided or terminated forthwith, depending on the
            circumstances and the total amount paid by the subscriber. <br />
            The client will receive no refund of any installments.
          </p>
          <p>
            When a subscriber&apos;s insurance protection is downgraded within
            the circumstances of this section, Brolly shall inform the
            subscriber by a message sent to the last known medium of contact
            with the subscriber.
          </p>

          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize ml-6">
              &bull; subscribers without payroll deduction
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>
          <p>
            Where a subscriber&apos;s employer has not yet agreed to payroll
            deduction, a different grace period applies.
          </p>
          <p>
            Where a payment is missed, the subscriber has 14 days to make the
            missed payment plus an administration fee of 10% of the missed
            payment. If the payment is not received by the close of business on
            the 14th day following the date on which the payment was due, the
            subscriber&apos;s insurance coverage may be downgraded to third
            party only cover.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                Restoring a Subscriber&apos;s Original Protection After A
                Downgrade
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
            <p>
              A subsceiber whose insurance protection has been downgraded may
              have the option to restore the protection under the originally
              selected cover. A subscriber who desires to restore cover would be
              assisted to do so by email to
              <Link href="mailto:hello@brolly.africa" passHref>
                <a href="#" className="font-semibold">
                  hello@brolly.africa
                </a>
              </Link>
              or by call or through any of our other contact methods provided in
              the subscriber&apos;s account.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                Prepayment of total outstanding
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
            <p>
              A subscriber may opt to settle the full amount outstanding on
              their account to end the Pay Monthly Insurance Scheme on their
              account. Where a subscriber so decides, they may contact us by
              email at{" "}
              <Link href="mailto:hello@brolly.africa" passHref>
                <a href="#" className="font-semibold">
                  hello@brolly.africa
                </a>
              </Link>
              or through any of our other contact methods.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                Termination of Cover
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
            <p>
              A subscriber&apos;s insurance protection shall be terminated where
              the subscriber wilfully provides false, inaccurate, or misleading
              information to benefit from the Installment Pay Monthly Insurance
              scheme or procure Brolly&apos;s acceptance of their offer. A
              subscriber&apos;s insurance coverage may also be terminated where
              (s)he closes the account on which the recurring payments is set up
              or deprives that account of funding such that Brolly is unable to
              obtain recurring deductions.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                Data Sharing With Credit Reference Agencies
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
            <p>
              We may submit payment and default reports to the various Credit
              Reference Agencies in Ghana from our operations. Such reports may
              include contractual payments received, contractual payments
              missed, and payments rescheduled.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                Validity of Electronic Agreement
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
            <p>
              By accepting this agreement, you accept that it shall have full
              legal force and validity as if it was completed on paper.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                Severability
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
            <p>
              The unenforceability or invalidity of any section of this
              Agreement shall not have an impact on the enforceability or
              validity of any other section. Any unenforceable or invalid
              section shall be regarded as removed from this Agreement to the
              extent of its unenforceability and invalidity. Therefore, this
              Agreement shall be interpreted and enforced as if it did not
              contain the said section to the extent of its unenforceability and
              invalidity.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                Governing Law
              </h1>
              <hr className="w-full text-gray-700 bg-gray-700" />
            </div>
            <p>
              This Agreement shall be governed by, and construed in accordance
              with, the laws of the Republic of Ghana (“Governing Law”).
            </p>
            <p>
              Kindly indicate your acceptance of this agreement by ticking and
              selecting ACCEPT below. Additionally, kindly print your full legal
              name and the date of acceptance.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-row items-center justify-start text-left space-x-2 cursor-pointer">
            <input
              id="acceptTerms"
              className="form-checkbox border border-gray-300 cursor-pointer"
              type="checkbox"
              checked={acceptTerms}
              onChange={() => {
                setAcceptTerms(!acceptTerms);
              }}
            />
            <label
              htmlFor="acceptTerms"
              className="leading-tight font-normal cursor-pointer"
            >
              I agree to the above terms.
            </label>
          </div>
        </div>

        <div className="w-full flex flex-row justify-end">
          <button
            className={`bg-primary-main rounded-md px-4 py-2 w-max flex flex-row items-center space-x-2 cursor-pointer`}
            onClick={async (ev) => {
              ev.preventDefault();

              _acceptAgreement();
            }}
          >
            <span> Proceed </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgreementForm;
