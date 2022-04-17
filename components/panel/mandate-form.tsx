import {
  ChevronLeftIcon,
  PhotographIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import moment from "moment";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import {
  dataURItoBlob,
  mkGetReq,
  mkPostReq,
  noOfInstallmentIntValue,
} from "../../utils/functions";
import FormGroup from "../form-group";
import ListBox from "../list-box";
import DocumentPreview from "./document-preview";
import DocumentView from "./document-view";
import FileUpload from "./file-upload";

const MandateForm: FC<{
  policy: any;
  onReturn?: () => void;
  onProceed: () => void;
}> = ({ policy, onReturn, onProceed }) => {
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
  const [selectedEmployer, setSelectedEmployer] = useState<{
    name: string;
    value: string;
    id: string;
  }>({ name: "", value: "Select Employer", id: "" });
  const [employerFull, setEmployerFull] = useState<string>("");
  const [employerAddress, setEmployerAddress] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [employeeNumber, setEmployeeNumber] = useState<string>("");
  const [payrollNumber, setPayrollNumber] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<{
    name: string;
    value: string;
    id: string;
  }>({ name: "", value: "Nature Of Employment", id: "" });
  const [natureOfEmployment, setNatureOfEmployment] = useState<string>("");
  const [initialDeposit, setInitialDeposit] = useState<string>("");
  const [monthlyInstallment, setMonthlyInstallment] = useState<string>("");
  const [noOfInstallments, setNoOfInstallments] = useState<string>("");

  const [staffId, setStaffId] = useState<any>(null);
  const [recentPayslip, setRecentPayslip] = useState<any>(null);

  const [allDataValid, setAllDataValid] = useState<boolean>(false);

  const [previewDoc, setPreviewDoc] = useState<{
    doc: string;
    type: "image" | "document";
  } | null>(null);

  const { GLOBAL_OBJ } = useContext(AuthContext);

  const employerList = [
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
      name: "VAT",
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
  ];

  const employmentTypeList = [
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
  ];

  const _uploadStaffID = async (file?: File) => {
    // toast.info("Uploading staff ID");
    let form_data = new FormData();
    form_data.append("file", file ?? staffId);

    try {
      let upload_licence_response = await mkPostReq({
        endpoint: `/api/user-documents/upload`,
        queries: `docType=STAFF_ID&userId=${GLOBAL_OBJ.data.user_id}`,
        method: "post",
        token: GLOBAL_OBJ.token,
        isJSON: false,
        data: form_data,
      });
      console.log(upload_licence_response);

      if (upload_licence_response.status) {
        toast.error(upload_licence_response.title);
      } else {
        // handle success
        setStaffId({
          name: upload_licence_response.docURL,
          id: upload_licence_response.id,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const _deleteStaffId = async () => {
    try {
      await mkPostReq({
        endpoint: `/api/user-documents/${staffId.id}`,
        isJSON: true,
        method: "delete",
        token: GLOBAL_OBJ.token,
        data: {},
      }).then(() => {
        setStaffId(null);
      });
      // console.log(delete_doc);
      toast.success("Driver licence deleted.");
    } catch (error) {
      // console.log(error);
    }
    console.log(staffId);
  };

  const _uploadPayslip = async (file?: File) => {
    // toast.info("Uploading Payslip");
    let form_data = new FormData();
    form_data.append("file", file ?? recentPayslip);

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
      console.log(uploaded_docs);
      payslip_docs = uploaded_docs.filter(
        (_doc: any) => _doc.docType === "PAYSLIP"
      );
      console.log(payslip_docs);
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
      console.log(delete_doc);
    } catch (error) {
      console.log(error);
    }

    try {
      let upload_payslip_response = await mkPostReq({
        endpoint: `/api/user-documents/upload`,
        queries: `docType=PAYSLIP&userId=${GLOBAL_OBJ.data.user_id}`,
        method: "post",
        token: GLOBAL_OBJ.token,
        isJSON: false,
        data: form_data,
      });
      console.log(upload_payslip_response);

      if (upload_payslip_response.status) {
        toast.error(upload_payslip_response.title);
      } else {
        // handle success
        setRecentPayslip({
          name: upload_payslip_response.docURL,
          id: upload_payslip_response.id,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const _deletePayslip = async () => {
    try {
      let delete_doc = await mkPostReq({
        endpoint: `/api/user-documents/${recentPayslip.id}`,
        isJSON: true,
        method: "delete",
        token: GLOBAL_OBJ.token,
        data: {},
      });
      // console.log(delete_doc);
      toast.success("Payslip deleted.");
      setRecentPayslip(null);
    } catch (error) {
      // console.log(error);
    }
  };

  const _handleAcceptMandate = async () => {
    if (confirmFullName === ``) {
      toast.error("Enter your name in the Sign section to proceed");
      return;
    }

    // toast.info("Updating Quote Information...");
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
      employmentType: employmentType.name,
      natureOfEmployment,
      initialDeposit,
      monthlyInstallment,
      noOfInstallments,
      authorization: {
        name: `${firstName} ${surname} ${otherNames}`,
        institution: employer,
      },
      state: region,
      sign: confirmFullName,
      date: moment().format("DD-MM-YYYY"),
    };
    console.log(update_data);

    try {
      let update_insurance_response = await mkPostReq({
        endpoint: `/api/insurances/payroll-mandate-form/${policy.id}`,
        queries: "",
        method: "post",
        token: GLOBAL_OBJ.token,
        isJSON: true,
        data: JSON.stringify(update_data),
      });
      console.log(update_insurance_response);

      if (update_insurance_response.httpStatus) {
        toast.error(update_insurance_response.title);
      } else {
        // handle success
        onProceed();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const _getUserDetails = async () => {
    try {
      let user_details_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/account`,
        queries: ``,
        token: GLOBAL_OBJ.token,
      });
      console.log(user_details_response);

      if (user_details_response.status) {
        toast.error(user_details_response.title);
      } else {
        // handle success
        setAddress(user_details_response.address);
        setRegion(user_details_response.state);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      // console.log(error);
    }
  };

  const _getUserEmployment = async () => {
    try {
      let user_employment_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/user-employment-details/user-id/${GLOBAL_OBJ.data.user_id}`,
        queries: ``,
        token: GLOBAL_OBJ.token,
      });
      console.log(user_employment_response);

      if (user_employment_response.status) {
        // toast.error(user_employment_response.title);
      } else {
        // handle
        setEmployeeNumber(user_employment_response.employeeNumber);
        setPayrollNumber(user_employment_response.payrollNumber);
        setRank(user_employment_response.rank);

        console.log(
          employerList.filter(
            (_emp) => _emp.name === user_employment_response.employer
          )[0]
        );

        setEmployer(user_employment_response.employer);

        let temp_sel_emp = employerList.filter(
          (_emp) => _emp.name === user_employment_response.employer
        )[0];
        console.log(temp_sel_emp);
        setSelectedEmployer(
          employerList.filter(
            (_emp) => _emp.name === user_employment_response.employer
          )[0]
        );
        setEmployerFull(
          employerList.filter(
            (_emp) => _emp.name === user_employment_response.employer
          )[0].value
        );

        setEmployerAddress(user_employment_response.employerAddress);

        setEmploymentType(
          employmentTypeList.filter(
            (_emp) => _emp.name === user_employment_response.employmentType
          )[0]
        );
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      // console.log(error);
    }
  };

  const _getUserDocuments = async () => {
    try {
      let policy_docs_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/user-documents/user`,
        token: GLOBAL_OBJ.token,
        queries: `userId=${GLOBAL_OBJ.data.user_id}`,
      });
      console.log(policy_docs_response);

      // set staff id
      let staff_id = policy_docs_response.filter(
        (_doc: any) => _doc.docType === "STAFF_ID"
      );
      if (staff_id.length > 0) {
        console.log("staff id found");
        console.log(staff_id[staff_id.length - 1]);
        setStaffId({
          name: staff_id[staff_id.length - 1].docURL,
          id: staff_id[staff_id.length - 1].id,
        });
      } else {
        // console.log("no staff id found");
      }

      // set payslip
      let payslip = policy_docs_response.filter(
        (_doc: any) => _doc.docType === "PAYSLIP"
      );
      if (payslip.length > 0) {
        console.log("pay slip found");
        console.log(payslip[payslip.length - 1]);
        setRecentPayslip({
          name: payslip[payslip.length - 1].docURL,
          id: payslip[payslip.length - 1].id,
        });
      } else {
        // console.log("no pay slip found");
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
      setNoOfInstallments(policy.noOfInstallments);

      console.log(
        policy.noOfInstallments,
        noOfInstallmentIntValue(policy.noOfInstallments.split("_")[0])
      );
    }

    return () => {
      mounted = false;
    };
  }, [policy]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      _getUserDetails();
      _getUserEmployment();
      _getUserDocuments();
    }
    return () => {
      mounted = false;
    };
  }, []);

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

        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 gap-4">
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
            values={employerList}
            selected={selectedEmployer}
            onValueChange={(_type: any) => {
              console.log(_type);
              setSelectedEmployer(_type);
              setEmployer(_type.name);
              setEmployerFull(_type.value);
            }}
          />

          {/* <ListBoxSearch id={""} values={[]} onValueChange={() => {}} /> */}

          {/* <FormGroup
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
          /> */}

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
          {/* 
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
          /> */}

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
            values={employmentTypeList}
            selected={employmentType}
            onValueChange={(_type: any) => {
              console.log(_type);
              setEmploymentType(_type);
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
            value={policy?.initialDeposit.toFixed(2)}
            onValueChanged={() => {}}
            onFocusOut={() => {}}
            disabled={true}
          />
          {noOfInstallments !== "FULL_PAYMENT" && (
            <>
              <FormGroup
                type="text"
                id="monthlyInstallment"
                label="Monthly Installment"
                placeholder=""
                className="rounded-[0px] border placeholder-[#848484] focus:ring-primary-border"
                value={policy?.monthlyInstallment.toFixed(2)}
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
                value={`${noOfInstallmentIntValue(
                  noOfInstallments.split("_")[0]
                )} Months`}
                onValueChanged={() => {}}
                onFocusOut={() => {}}
                disabled={true}
              />
            </>
          )}
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
          Whereas I,{" "}
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
          shall remain in force except by letter duly signed by the authorized
          person of the company on your records.
        </p>

        <div className="w-full flex flex-col space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                staff ID
              </h1>
            </div>
            {staffId ? (
              <DocumentPreview
                document={staffId.name}
                onView={(_doc, _type) => {
                  console.log(_doc, _type);
                  setPreviewDoc({
                    doc: `${process.env.NEXT_PUBLIC_USER_DOCS_STORAGE_LINK}${_doc}`,
                    type: _type,
                  });
                }}
                onDelete={() => {
                  _deleteStaffId();
                }}
              />
            ) : (
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

                    let file = new File([blobImage], image[0].name, {
                      type: contentType,
                    });
                    console.log(file);

                    setStaffId(file);
                    _uploadStaffID(file);
                    return;
                  }
                  setStaffId(null);
                }}
              />
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-8 items-center">
              <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                Recent Payslip
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {recentPayslip ? (
                // <a className="flex flex-col w-full">
                //   <img
                //     src="/img/document.svg"
                //     alt="Document Preview"
                //     className="w-1/3"
                //     onClick={() => {
                //       setPreviewDoc({
                //         doc: `${process.env.NEXT_PUBLIC_USER_DOCS_STORAGE_LINK}${recentPayslip}`,
                //         type: "image",
                //       });
                //     }}
                //   />
                //   <div className="flex flex-row items-center space-x-4">
                //     <p className="text-dark font-semibold truncate text-sm">
                //       {recentPayslip.name ?? recentPayslip}
                //     </p>
                //     <button
                //       className="delete focus:outline-none text-danger-main hover:bg-gray-200 p-1 rounded-md"
                //       onClick={(ev) => {
                //         ev.preventDefault();
                //         // remove this image
                //         setRecentPayslip(null);
                //       }}
                //     >
                //       <TrashIcon className="w-5 h-5" />
                //     </button>
                //   </div>
                // </a>
                <DocumentPreview
                  document={recentPayslip.name}
                  onView={(_doc, _type) => {
                    console.log(_doc, _type);
                    setPreviewDoc({
                      doc: `${process.env.NEXT_PUBLIC_USER_DOCS_STORAGE_LINK}${_doc}`,
                      type: _type,
                    });
                  }}
                  onDelete={() => {
                    _deletePayslip();
                  }}
                />
              ) : (
                <FileUpload
                  multiple={false}
                  allowSelect={!recentPayslip}
                  type="document"
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

                      let file = new File([blobImage], image[0].name, {
                        type: contentType,
                      });
                      console.log(file);

                      setRecentPayslip(file);
                      _uploadPayslip(file);
                      return;
                    }
                    setRecentPayslip(null);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-row items-center space-x-4">
          <p> SIGN: </p>

          <FormGroup
            type="text"
            id="fullName"
            placeholder="PRINT FULL NAME"
            className="w-full rounded-[0px] placeholder-[#848484] focus:ring-primary-border"
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

              if (
                !(
                  confirmFullName.includes(firstName) &&
                  confirmFullName.includes(surname)
                )
              ) {
                toast.error("Signed name does not match records");
                return;
              }

              if (employer === "") {
                toast.error("Select employer");
                return;
              }

              if (employmentType.name === "") {
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

              // if (!recentPayslip) {
              //   console.log("no payslip, upload new");
              //   await _uploadPayslip();
              // }

              // if (!staffId) {
              //   console.log("no staff id, upload new");
              //   await _uploadStaffID();
              // }
              _handleAcceptMandate();
            }}
          >
            <span> Proceed </span>
          </button>
        </div>
      </div>
      <DocumentView
        document={previewDoc?.doc}
        show={previewDoc ? true : false}
        type={previewDoc?.type}
        onClose={() => {
          setPreviewDoc(null);
        }}
      />
    </div>
  );
};

export default MandateForm;
