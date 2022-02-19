import { ChevronLeftIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import {
  dataURItoBlob,
  mkGetReq,
  mkPostReq,
} from "../../utils/functions";
import FormGroup from "../form-group";
import ListBox from "../list-box";
import FileUpload from "./file-upload";

const MandateForm: FC<{ policy: any; onReturn?: () => void }> = ({
  policy,
  onReturn,
}) => {
  // console.log(policy);

  const [tempSection, setTempSection] = useState<string>("user");
  const [detailsSection, setDetailsSection] = useState<string>("user");

  // quote details states
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [otherNames, setOtherNames] = useState<string>("");
  const [confirmFullName, setConfirmFullName] = useState<string>("");

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [employer, setEmployer] = useState<string>("");
  const [employerFull, setEmployerFull] = useState<string>("");
  const [employerAddress, setEmployerAddress] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [employeeNumber, setEmployeeNumber] = useState<string>("");
  const [payrollNumber, setPayrollNumber] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");
  const [initialDeposit, setInitialDeposit] = useState<string>("");
  const [monthlyInstallment, setMonthlyInstallment] = useState<string>("");
  const [noOfInstallments, setNoOfInstallments] = useState<string>("");

  const [staffId, setStaffId] = useState<any>(null);
  const [recentPayslip, setRecentPayslip] = useState<any>(null);

  const [allDataValid, setAllDataValid] = useState<boolean>(false);

  const { GLOBAL_OBJ } = useContext(AuthContext);

  const _uploadStaffID = async () => {
    toast.info("Uploading staff ID");
    let form_data = new FormData();
    form_data.append("file", staffId);

    // for (var entry of form_data.entries()) {
    //   console.log(entry[0] + ": " + entry[1]);
    // }

    let staff_id_docs = [];
    try {
      let uploaded_docs = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/user-documents`,
        token: GLOBAL_OBJ.token,
        queries: ``,
      });
      // console.log(uploaded_docs);
      staff_id_docs = uploaded_docs.filter(
        (_doc: any) => _doc.docType === "STAFF_ID"
      );
      // console.log(staff_id_docs);
    } catch (error) {
      // console.log(error);
    }

    // delete already existing dvla dov
    try {
      let delete_doc = await mkPostReq({
        endpoint: `/api/user-documents/${staff_id_docs[0].id}`,
        isJSON: true,
        method: "delete",
        token: GLOBAL_OBJ.token,
        data: {},
      });
      // console.log(delete_doc);
    } catch (error) {
      // console.log(error);
    }

    try {
      let upload_licence_response = await mkPostReq({
        endpoint: `/api/user-documents/upload`,
        queries: `docType=STAFF_ID&userId=${GLOBAL_OBJ.data.user_id}`,
        method: "post",
        token: GLOBAL_OBJ.token,
        isJSON: false,
        data: form_data,
      });
      // console.log(upload_licence_response);

      if (upload_licence_response.status) {
        toast.error(upload_licence_response.title);
      } else {
        // handle success
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const _uploadPayslip = async () => {
    toast.info("Uploading staff ID");
    let form_data = new FormData();
    form_data.append("file", recentPayslip);

    // for (var entry of form_data.entries()) {
    //   console.log(entry[0] + ": " + entry[1]);
    // }

    let payslip_docs = [];
    try {
      let uploaded_docs = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/user-documents`,
        token: GLOBAL_OBJ.token,
        queries: ``,
      });
      // console.log(uploaded_docs);
      payslip_docs = uploaded_docs.filter(
        (_doc: any) => _doc.docType === "PAYSLIP"
      );
      // console.log(payslip_docs);
    } catch (error) {
      // console.log(error);
    }

    // delete already existing payslip dov
    try {
      let delete_doc = await mkPostReq({
        endpoint: `/api/user-documents/${payslip_docs[0].id}`,
        isJSON: true,
        method: "delete",
        token: GLOBAL_OBJ.token,
        data: {},
      });
      // console.log(delete_doc);
    } catch (error) {
      // console.log(error);
    }

    try {
      let upload_licence_response = await mkPostReq({
        endpoint: `/api/user-documents/upload`,
        queries: `docType=PAYSLIP&userId=${GLOBAL_OBJ.data.user_id}`,
        method: "post",
        token: GLOBAL_OBJ.token,
        isJSON: false,
        data: form_data,
      });
      // console.log(upload_licence_response);

      if (upload_licence_response.status) {
        toast.error(upload_licence_response.title);
      } else {
        // handle success
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const _handleAcceptMandate = async () => {
    if (confirmFullName === ``) {
      toast.error("Enter your name in the Sign section to proceed");
      return;
    }

    toast.info("Updating Quote Information...");
    let update_data = {
      firstName,
      lastName: surname,
      otherNames,
      employer,
      address,
      employerAddress,
      phoneNumber,
      employeeNumber,
      payrollNumber,
      rank,
      employmentType,
      initialDeposit,
      monthlyInstallment,
      noOfInstallments,
      authorization: {
        name: `${firstName} ${surname} ${otherNames}`,
        institution: employer,
      },
      sign: confirmFullName,
      date: moment().format("DD-MM-YYYY"),
    };

    try {
      let update_insurance_response = await mkPostReq({
        endpoint: `/api/insurances/payroll-mandate-form/${policy.id}`,
        queries: "",
        method: "post",
        token: GLOBAL_OBJ.token,
        isJSON: true,
        data: JSON.stringify(update_data),
      });
      // console.log(update_insurance_response);

      if (update_insurance_response.httpStatus) {
        toast.error(update_insurance_response.title);
      } else {
        // handle success
        onReturn && onReturn();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log(policy);

    if (policy) {
      setFirstName(policy.firstName ?? "");
      setSurname(policy.lastName ?? "");
      setOtherNames(policy.otherName ?? "");
      setPhoneNumber(policy.phoneNumber ?? "");

      setInitialDeposit(policy.initialDeposit ?? "");
      setMonthlyInstallment(policy.monthlyInstallment ?? "");
      setNoOfInstallments(policy.noOfInstallments ?? "");
    }

    return () => {
      mounted = false;
    };
  }, [policy]);

  useEffect(() => {
    console.log(GLOBAL_OBJ);
  }, [GLOBAL_OBJ]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <button
        className="px-3 py-1 text-gray-700 border border-primary-border flex flex-row items-center justify-center space-x-8 hover:bg-primary-main hover:text-dark rounded-md"
        onClick={onReturn}
      >
        <ChevronLeftIcon className="w-4 h-4" /> Back
      </button>

      <div className="py-4 flex flex-col items justify-center space-y-8">
        <div className="w-full flex flex-row space-x-4 items-center justify-center">
          <hr className="md:w-full text-gray-700 bg-gray-700" />
          <h1 className="w-max md:whitespace-nowrap text-center font-bold text-lg capitalize">
            payroll deduction mandate
          </h1>
          <hr className="md:w-full text-gray-700 bg-gray-700" />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <FormGroup
            type="text"
            id="firstName"
            label="First Name"
            placeholder="Eg: Jason"
            className="w-full rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={firstName}
            onValueChanged={(_val: any) => {
              setFirstName(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setFirstName(_val.target.value);
            }}
          />

          <FormGroup
            type="text"
            id="surname"
            label="Surname"
            placeholder="Eg: Quaicoo"
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={surname}
            onValueChanged={(_val: any) => {
              setSurname(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setSurname(_val.target.value);
            }}
          />

          <FormGroup
            type="text"
            id="otherName"
            label="Other Names"
            placeholder="Eg: Yaw"
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={otherNames}
            onValueChanged={(_val: any) => {
              setOtherNames(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setOtherNames(_val.target.value);
            }}
          />

          <ListBox
            id={""}
            label="Employer"
            search={true}
            values={[
              {
                name: "",
                value: "Employer",
                id: "0",
              },
              {
                name: "GHANA_POLICE_SERVICE",
                value: "Ghana Police Service",
                id: "0",
              },
              {
                name: "GHANA_ARMED_FORCES",
                value: "Ghana Armed Forces",
                id: "0",
              },
              {
                name: "GRA",
                value: "Ghana Revenue Authority",
                id: "0",
              },
              {
                name: "CEPS",
                value: "CEPS",
                id: "0",
              },
              {
                name: "IRS",
                value: "Internal Revenue Service",
                id: "0",
              },
              {
                name: "HEALTH_SERVICE",
                value: "Health Service",
                id: "0",
              },
              {
                name: "EDUCATION_SERVICE",
                value: "Education Service",
                id: "0",
              },
              {
                name: "IMMIGRATION",
                value: "Ghana Immigration Service",
                id: "0",
              },
              {
                name: "GHAPOHA",
                value: "Ghana Ports And Harbours Authority",
                id: "0",
              },
              {
                name: "OTHER",
                value: "Other",
                id: "0",
              },
            ]}
            selected={{
              name: "",
              value: "Employer",
              id: "0",
            }}
            onValueChange={(_type: any) => {
              console.log(_type);
              setEmployer(_type.name);
              setEmployerFull(_type.value);
            }}
          />

          {/* <ListBoxSearch id={""} values={[]} onValueChange={() => {}} /> */}

          <FormGroup
            type="text"
            id="otherName"
            label="Location"
            placeholder=""
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={address}
            onValueChanged={(_val: any) => {
              setAddress(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setAddress(_val.target.value);
            }}
          />

          <FormGroup
            type="text"
            id="employerAddress"
            label="Employer's Address"
            placeholder=""
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={employerAddress}
            onValueChanged={(_val: any) => {
              setEmployerAddress(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setEmployerAddress(_val.target.value);
            }}
          />

          <FormGroup
            type="text"
            id="region"
            label="Region"
            placeholder="Eg: Greater Accra"
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={region}
            onValueChanged={(_val: any) => {
              setRegion(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setRegion(_val.target.value);
            }}
          />

          <FormGroup
            type="text"
            id="phoneNumber"
            label="Contact Number"
            placeholder="Eg: 233123456789"
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={phoneNumber}
            onValueChanged={() => {}}
            onFocusOut={() => {}}
            disabled={true}
          />

          <FormGroup
            type="text"
            id="employeeNumber"
            label="Employee Number"
            placeholder=""
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={employeeNumber}
            onValueChanged={(_val: any) => {
              setEmployeeNumber(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setEmployeeNumber(_val.target.value);
            }}
          />

          <FormGroup
            type="text"
            id="payrollNumber"
            label="Payroll Number"
            placeholder=""
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={payrollNumber}
            onValueChanged={(_val: any) => {
              setPayrollNumber(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setPayrollNumber(_val.target.value);
            }}
          />

          <FormGroup
            type="text"
            id="rank"
            label="Rank"
            placeholder="Eg: Assitant Director"
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={rank}
            onValueChanged={(_val: any) => {
              setRank(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setRank(_val.target.value);
            }}
          />

          <ListBox
            label="Nature of Employment"
            id="natureOfEmployment"
            values={[
              {
                name: "",
                value: "Nature Of Employment",
                id: "0",
              },
              {
                name: "PERMANENT_FULL_TIME",
                value: "Permanent Full Time",
                id: "1",
              },
              {
                name: "CONTRACT",
                value: "Contract",
                id: "2",
              },
              {
                name: "PROBATIONARY",
                value: "Probationary",
                id: "3",
              },
            ]}
            selected={{
              name: "",
              value: "Nature Of Employment",
              id: "0",
            }}
            onValueChange={(_type: any) => {
              console.log(_type);
              setEmploymentType(_type.name);
            }}
          />

          <FormGroup
            type="text"
            id="product"
            label="Product"
            placeholder=""
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={"Insurance"}
            onValueChanged={() => {}}
            onFocusOut={() => {}}
            disabled={true}
          />

          <FormGroup
            type="text"
            id="initialDeposit"
            label="Initial Deposit"
            placeholder=""
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={initialDeposit}
            onValueChanged={() => {}}
            onFocusOut={() => {}}
            disabled={true}
          />

          <FormGroup
            type="text"
            id="monthlyInstallment"
            label="Monthly Installment"
            placeholder=""
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={monthlyInstallment}
            onValueChanged={() => {}}
            onFocusOut={() => {}}
            disabled={true}
          />

          <FormGroup
            type="text"
            id="numberOfMonths"
            label="Number Of Months"
            placeholder=""
            className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
            value={noOfInstallments.replace("_", " ")}
            onValueChanged={() => {}}
            onFocusOut={() => {}}
            disabled={true}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
              authorization
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>
        </div>

        <p>
          Whereas I,
          <span className="underline">
            <span className="font-bold capitalize">{firstName}</span>{" "}
            <span className="font-bold capitalize">{surname}</span>
          </span>
          , have received the above-stated product/service on an installment
          payment basis from Brolly and have authorized monthly installments to
          be deducted directly from my bank account, I do hereby agree that if
          any due payment from my bank account fails and I subsequently fail to
          make good on the missed payment within 7 days, Brolly shall be
          authorized to present the missed payment and all remaining
          installments for deduction from my salary at source. I do hereby, by
          this deduction mandate voluntarily executed by me, authorize my
          employer institution,{" "}
          <span className="font-bold underline capitalize">
            {employerFull !== ""
              ? employerFull
              : "____________________________"}
          </span>
          , to deduct such payment which shall be presented by Brolly within the
          terms of my installment payment agreement with them from my salary
          monthly to the credit of BROLLY. This mandate shall not be revoked and
          shall remain in force except by letter duly signed by the authoriZed
          person of the company on your records.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                staff ID
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <FileUpload
                multiple={false}
                allowSelect={!staffId}
                onFileLoad={(image: any) => {
                  console.log(image);

                  if (image) {
                    //console.log(productImages)
                    var block = image[0].file?.split(";");

                    // Get the content type of the image
                    var contentType = block[0].split(":")[1]; // In this case "image/gif"

                    // get the real base64 content of the file
                    var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

                    // Convert it to a blob to upload
                    var blobImage = dataURItoBlob(realData);
                    console.log(blobImage);

                    setStaffId(blobImage);
                    return;
                  }
                  setStaffId(null);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                Recent Payslip
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <FileUpload
                multiple={false}
                allowSelect={!recentPayslip}
                onFileLoad={(image: any) => {
                  console.log(image);

                  if (image) {
                    //console.log(productImages)
                    var block = image[0].file?.split(";");

                    // Get the content type of the image
                    var contentType = block[0].split(":")[1]; // In this case "image/gif"

                    // get the real base64 content of the file
                    var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

                    // Convert it to a blob to upload
                    var blobImage = dataURItoBlob(realData);
                    // console.log(blobImage);

                    setRecentPayslip(blobImage);
                    return;
                  }
                  setRecentPayslip(null);
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-row items-center space-x-4">
          <p> SIGN: </p>

          <FormGroup
            type="text"
            id="firstName"
            placeholder="Eg: Jason Bediako Afari"
            className="w-full rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
            value={confirmFullName}
            onValueChanged={(_val: any) => {
              setConfirmFullName(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setConfirmFullName(_val.target.value);
            }}
          />
        </div>
        <div className="flex flex-row items-center space-x-4">
          <p>DATE:</p>{" "}
          <p className="font-bold">{moment().format("ddd DD MMM, YYYY")}</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-row items-center justify-start text-left space-x-2 cursor-pointer">
            <input
              id="acceptTerms"
              className="form-checkbox border border-gray-800 cursor-pointer"
              type="checkbox"
              checked={allDataValid}
              onChange={() => {
                setAllDataValid(!allDataValid);
              }}
            />
            <label
              htmlFor="acceptTerms"
              className="leading-tight font-normal cursor-pointer"
            >
              I agree to the authorization stated above.
            </label>
          </div>
        </div>

        <div className="w-full flex flex-row justify-end">
          <button
            className={`bg-primary-main rounded-md px-4 py-2 w-max flex flex-row items-center space-x-2 cursor-pointer`}
            onClick={async (ev) => {
              ev.preventDefault();

              // console.log(allDataValid);

              if (employer === "") {
                toast.error("Select employer");
                return;
              }

              if (employmentType === "") {
                toast.error("Select employment type");
                return;
              }

              if (!staffId) {
                toast.error("Attach an image of your Staff ID");
                return;
              }

              if (!recentPayslip) {
                toast.error("Attach an image of your most recent payslip");
                return;
              }

              if (!allDataValid) {
                toast.error("Confirm all data provided is valid");
                return;
              }

              await _uploadPayslip();
              await _uploadStaffID();
              _handleAcceptMandate();
            }}
          >
            <span> Proceed </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MandateForm;
