import Link from "next/link";
import React, { FC } from "react";

const TOS: FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex">
        <h1 className="text-4xl font-bold text-dark">
          Terms of Use <span className="text-sm text-gray-700 font-semibold italic">~ November 1st, 2021</span>
        </h1>
      </div>
      <div className="space-y-8">
        <p>
          All uses of the Brolly website are subject to the following “Terms of Use”. Please read these Terms of Use
          carefully before accessing or using any part of this web app. By accessing or using this web app, you agree
          that you have read, understood, and agreed to be bound by these Terms of Use as amended from time to time, as
          well as the Brolly Privacy Policy, which is hereby incorporated into these Terms of Use. If you do not wish to
          agree to these Terms of Use, do not access or use any part of this web app. Brolly may revise and update these
          Terms of Use at any time by posting the amended terms to this Website. Your continued use of the website means
          that you accept and agree to be bound by the revised Terms of Use. If you disagree with the Terms of Use (as
          amended from time to time) or are dissatisfied with this web app, your sole and exclusive remedy is to
          discontinue using this web app. The most current version of these Terms of Use, which supersedes all previous
          versions, can be reviewed by clicking on the “Terms of Use” hyperlink and may be accessed anytime by visiting{" "}
          <Link href="/legal?section=tos" passHref>
            <a href="#" className="text-dark font-semibold">
              www.brolly.africa/legal
            </a>
          </Link>
        </p>

        <h2 className="text-xl font-bold text-dark text-left">About Brolly</h2>
        <p>
          “Brolly” is a registered trademark owned by Brolly F&amp;T Limited which is registered by the Registrar
          General’s Department of Ghana with Number CS031310222. You may not use the mark and any designs on our web app
          without the written permission of Brolly F&amp;T Limited. Brolly operates as a Corporate Agent of Allianz
          Insurance Ghana Limited. All policies sold are therefore underwritten by Allianz Insurance Ghana Limited.
          Allianz Insurance Ghana Limited is therefore directly and ultimately responsible for settling all claims
          incurred on policies purchased through the Brolly website. Brolly will however be the contact for all dealings
          on your insurance contracts purchased on the Brolly web app.{" "}
        </p>
        <p>
          Brolly earns fees in the form of commissions on every policy purchased through the website. We however take
          all reasonable steps to ensure that the commissions we earn do not influence the quality and appropriateness
          of the coverage we offer to users of the platform.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Quotes provided on our website</h2>
        <p>
          All quotes generated on this Web App are based on information you provided on this Web App or on other
          associated contact channels such as email, phone call, and whatsapp. Quotes do not constitute a contract,
          offer or an invitation to contract, or a binder or agreement to extend, continue or renew insurance coverage.
          Quotes and coverage descriptions provided in this Web App are general descriptions of potentially available
          insurance coverage products and services and are not a statement of contract or an invitation to contract. To
          obtain insurance coverage you must complete all of the steps in this Web App or through the associated contact
          channels. Your submission of the completed application is the offer which may be accepted by the underwriter.
          All applications for insurance are subject to underwriting review and approval.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Your Contract</h2>
        <p>
          The contract of insurance purchased on the Brolly website is between yourself and Allianz Insurance Ghana
          Limited. If you choose to pay the price of your insurance on installment, you enter an additional contract for
          insurance price pre-finance between yourself and Brolly F&amp;T Limited. The terms of the contract of
          insurance and the contract of insurance price pre-finance are contained in the policy pack sent to your on
          whatsapp and through your email immediately after you sign both contracts. Copies of both contracts are
          additionally stored in your user account on the Brolly web app.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Paying for your insurance</h2>
        <p>
          It is a term of use of our web app that you shall pay the price of insurance purchased on the web app whether
          by full outright payment at the time of purchase or through agreed installments. You agree that non-payment of
          the price of your insurance and/or the failure to make installment payments within agreed timelines may affect
          the validity of your contract and may consequently affect your entitlement to make claims on your contract.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Claims</h2>
        <p>
          For the avoidance of doubt, a claim refers to a request for compensation or payout on the occurrence of an
          insured risk and/or within the terms of your contract of insurance. Claims made on your contract through the
          website are directly made to Allianz Insurance Ghana Limited. Brolly will act to facilitate the payment of
          your claim within timelines agreed to by Allianz Insurance Ghana Limited within the terms of the contract and
          within the General Service Level Agreement which is incorporated into this Terms of Use.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Prohibition of Abuse</h2>
        <p>
          You agree to use the services offered through the Brolly wep app for the intended purposes only. Any use which
          is not in compliance with legal and regulatory provisions may lead to the withdrawal of the rights of use.
        </p>
        <p>
          You also commit to not undertake electronic attacks of any kind. An electronic attack is in particular the
          attempt to overcome or evade the security measures of Brolly or render them inoperative in some other way, the
          use of computer programmes to automatically retrieve data, the use of and/or the distribution of viruses,
          worms, trojans, brute force attacks, spam or the use of other links, programmes or procedures which could be
          harmful for Brolly.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Liability and Limitation of Liability</h2>
        <p>
          The Content of this web app is not and should not be construed as insurance advice. Reliance on the Site
          Content is solely at your own risk and Brolly disclaims any liability for injury or damages resulting from the
          use of any of the Content. Any insurance purchasing conclusions and decisions such as coverage amounts, limits
          and deductibles are completely and solely the responsibility of the insured. At the time of a claim, coverage
          will be determined in accordance with the terms and conditions of the applicable insurance policy and not the
          Content of the web app. Accordingly, you are encouraged to view/download a specimen of your actual policy
          documentation prior to making any purchase decision.
        </p>
        <p>
          In relation to the conclusion and performance of the user agreement, Brolly’s liability for any one event and
          in aggregate within any period of January to December shall not exceed US$200,000
          <li>in the event of physical injuries or damage to body or health;</li>
          <li>in the event of a deliberate or grossly negligent violation of duty;</li>
          <li>in the event of guaranties, where agreed;</li>
          <li>in the case of product liability regime.</li>
        </p>
        <p>
          With regard to violations of material contractual duties, whose fulfilment is a prerequisite for enabling the
          proper fulfilment of the insurance contracts purchased on the Brolly website caused by the negligence of
          Brolly or the legal representatives or vicarious agents (préposés) of Brolly, liability is limited to the
          amount of damages foreseeable at the point in time of the conclusion of the contract and not exceeding
          US$200,000 for any one event and in aggregate within any period of January to December. Beyond this, claims
          for damages are excluded.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Termination</h2>
        <p>The user agreement is for an indefinite term.</p>
        <p>
          A User may terminate the user agreement at any time without a period of notice by email to{" "}
          <Link href="mailto:hello@brolly.africa" passHref>
            <a href="#" className="text-dark font-semibold">
              hello@brolly.africa
            </a>
          </Link>{" "}
          with the subject line as “Termination of Terms of Use”. Brolly is entitled to terminate the user agreement
          with a period of notice of two (2) weeks at all times.
        </p>
        <p>Brolly however reserves the right to an extraordinary termination without notice for a material reason. </p>
        <p>The termination of the user agreement will not affect the existing insurance contracts.</p>
        <p>
          In the event of material violations of the user&apos;s duties and in the event of material reasons to suspect a
          material violation of duty, Brolly is entitled to block the Services to the user, in particular in the event
          of transmittal of deliberately incorrect or false personal data or details relevant to the insurance contract
          by the user. Brolly will inform the user of the reasons for being blocked by email. Such a blocking will
          continue until the violation of duty has been remedied and/or the user has confirmed in a credible manner to
          refrain from a violation of duty in the future.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Data Protection</h2>
        <p>
          During the use of the Services, Brolly will collect and process personal data. The data processing will be
          effected in accordance with the provisions of the respective applicable data protection laws. Further
          information on this can be found in the privacy policy.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Brolly Network Referral Program</h2>
        <p>
          “Brolly Network” refers to a programme which enables users of Brolly to invite their friends, family, and
          connections to use the Brolly web app. An activated referral earns the referring users a reward which may be
          cashed out periodically or accumulated towards the cost of an insurance purchase in future. An activated
          referral is a unique new user who makes a bindable purchase through the referrer’s unique link, or with the
          unique code of the referrer and for which at least the first premium is paid. Brolly Network does not create
          an agency relationship between Brolly and a referrer. Brolly reserves the right to terminate this program at
          any time. In this case, previously successfully activated referrals will still be paid for. Referrers are
          required to act in accordance with applicable laws and regulations, especially concerning Social Media and
          Influencer Marketing.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Complaints &amp; Redress</h2>
        <p>
          We delight in delivering unmatched services to everyone who uses our website and who deals with Brolly in any
          way. If we fail to meet your expectations at any point in time, please do not hesitate to reach out to us.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Reporting an issue</h2>
        <p>
          Reach out to our Customer Experience Team via whatsapp, email, or phone. Our team will be more than happy to
          help solve the issue.
        </p>
        <p>
          <b>Whatsapp</b>: +233 201 335 141 (24/7, 365)
          <br />
          <b>Email</b>:{" "}
          <Link href="mailto:hello@brolly.africa" passHref>
            <a href="#"> hello@brolly.africa</a>
          </Link>{" "}
          (24/7,365)
          <br />
          <b>Phone</b>:
          <Link href="tel:+233201335141" passHref>
            <a href="#"> +233 201 335 141</a>
          </Link>{" "}
          (Weekdays 8am to 6pm)
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Copyright Restrictions</h2>
        <p>
          All contents of this web app (including all information, software, text, displays, images and audio) and the
          design, selection and arrangement thereof, are proprietary to Brolly or its licensors and are protected by
          international laws regarding copyrights, trademarks, trade secrets and other proprietary rights. You are
          authorized only to use the content on the Brolly website for personal use or legitimate business purposes
          related to your role as a current or prospective customer, supplier or distributor of Brolly. You may not
          copy, modify, create derivative works of, publicly display or perform, republish, store, transmit or
          distribute any of the material on this web app without the prior written consent of Brolly, except to: (a)
          store copies of such materials temporarily in RAM, (b) store files that are automatically cached by your web
          browser for display enhancement purposes, and (c) print a reasonable number of pages of the Brolly website;
          provided in each case that you do not alter or remove any copyright or other proprietary notices included in
          such materials. Neither the title nor any intellectual property rights to any information or material in this
          Web App are transferred to you, but remain with Brolly or the applicable owner of such content. Except as
          expressly authorized by Brolly in writing, you may not reproduce, sell or exploit for any commercial purposes
          (i) any part of this Web App, (ii) access to this web app, or (iii) use of this web app or of any services or
          materials available through this web app.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Disclaimers &amp; Reservation of Rights</h2>
        <p>
          The Brolly web app is intended to be available 24 hours a day and 365 days a year. Brolly does not, however,
          undertake to provide uninterrupted availability of the web app. The availability may be limited due to reasons
          of force majeure including strikes, lockouts and administrative orders, as well as due to technical or other
          measures, necessary in respect of e.g. the systems of Brolly, the service provider or the network provider for
          orderly operation or improvement of the Services (e.g. maintenance, repair, system-related software updates,
          extensions). Disruptions to the Services may also result from short-term capacity shortfalls during peak
          utilisation of the Services or from disturbances of the telecommunications systems of third parties. Brolly
          will undertake all reasonable efforts to remedy such disruptions immediately or to ensure actions to that
          effect. During any scheduled maintenance works, Brolly will take into account the justified interests of the
          users, in particular by conducting the maintenance works at times of typically low usage.
        </p>
        <p>
          Should the taking of a time-bound contractual action such as a submission of required documents be impossible
          due to any malfunction, such actions may also be made by email, in writing by post, whatsapp, or by telephone.
          The relevant laws regarding timing of actions taken by email, post, whatsapp, or telephone shall apply in
          determining the relevant time at which such action was taken.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Governing Law</h2>
        <p>
          All transactions initiated and/or concluded on Brolly are made subject to the provisions of the Electronic
          Transaction Act 2008, Act 772 of Ghana which is available{" "}
          <Link href="https://www.nca.org.gh/assets/Uploads/NCA-Electronic-Transactions-Act-773.pdf" passHref>
            <a className="text-dark font-semibold" href="#">HERE</a>
          </Link>
          .
        </p>
        <p>
          All contracts and transactions concluded on Brolly shall be governed exclusively by the laws of the Republic
          of Ghana and the Courts of Ghana shall have absolute jurisdiction over any disputes which may arise under any
          contract or transaction concluded on or through Brolly.
        </p>
      </div>
    </div>
  );
};

export default TOS;
