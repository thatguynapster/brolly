import { dataURItoBlob, mkGetReq, mkPostReq, sentenceCase } from "../../utils/functions";
import React, { FC, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import { toast } from "react-toastify";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import FileUpload from "./file-upload";

const SubmitDocumentsView: FC<{
    policy: any;
    onReturn?: () => void;
    onProceed: () => void;
  }> = ({ policy, onReturn, onProceed }) => {

    const { GLOBAL_OBJ } = useContext(AuthContext);
    const [documents, setDocuments] = useState<any>({});
    const [dvla, setDvla] = useState<any>(null);
    const [carVideo, setCarVideo] = useState<any>(null);
    const docList = [
        "DVLA",
        "CAR_VIDEO",
        "CAR_FRONT_IMAGE",
        "CAR_REAR_IMAGE",
        "CAR_LEFT_IMAGE",
        "CAR_RIGHT_IMAGE",
        "CAR_ENGINE_IMAGE"
    ]

    const deleteInsuranceDocument = async (doc: any) => {
        await mkPostReq({        
            endpoint: `/api/insurance-documents/${doc.id}`,
            queries: "",
            method: "delete",
            token: GLOBAL_OBJ.token,
            isJSON: true,
            data: ""
        }).catch((error)=>{
            console.log(error);
        });
    }
    
    const createInsuranceDocument = async (docType: string, file: File) => {

        let formData = new FormData();
        formData.append("file", file);
       
        await fetch(`${process.env.NEXT_PUBLIC_API}/api/insurance-documents/upload?docType=${docType}&insuranceId=${policy.id}`, {    
                method: 'POST',
                headers: {
                  "Authorization": `Bearer ${GLOBAL_OBJ.token}`                  
                },
                body: formData                                            
            })
            .then(response => response.json())
            .then((resp)=>{
                console.log(resp);
                let filename = docType == "DVLA"? docType: sentenceCase(docType).split('_').join(" ")
                toast.success(`${filename} uploaded successfully!`)
                setTimeout(()=>{
                    let temp = {...documents};
                    temp[docType] = resp;
                    setDocuments(temp);
                }, 1000)
            })
    }

    const uploadInsuranceDocument = async (file: File, docType: any) => {

        if(documents["docType"]){
            await deleteInsuranceDocument(documents["docType"])
            .then(() =>{
                createInsuranceDocument(docType, file);
            })                           
        } else {
            createInsuranceDocument(docType, file);
        }
    }


    const getInsuranceDocuments = async () => {
    
        try {

            await mkGetReq({
                endpoint: `${process.env.NEXT_PUBLIC_API}/api/insurance-documents/insurance?insuranceId=${policy.id}`,
                queries: "",
                token: GLOBAL_OBJ.token,
            }).then((getDocumentsResponse) =>{
                if (getDocumentsResponse.httpStatus) {
                    toast.error(getDocumentsResponse.title);
                  } else {
                    // handle success
                    console.log(getDocumentsResponse);
                    
                    let temp = {...documents};
                    Object.values(getDocumentsResponse).map((document: any) => {                        
                        temp[document["docType"]] = document;
                    })
                    setDocuments(temp);
                  }
            })

        } catch (error) {
            console.log(error);
        }
    }

    function handleSubmitOnClick() {
        
        if(Object.keys(documents).length != 7){
            toast.error("All files must be uploaded before submitting")   
        } else {
            submitDocuments();
        }

    }

    const submitDocuments = async () => {
        await mkGetReq({
            endpoint: `${process.env.NEXT_PUBLIC_LOCAL_API}/api/insurances/submit-documents/${policy.id}`,
            queries: "",
            token: GLOBAL_OBJ.token
        }).catch(error=>{
            toast.error(error);
        }).finally(()=>{
            toast.success("Documents submitted for verification");
            onReturn && onReturn();
        });
    }

    useEffect(()=>{
        if(policy){
            getInsuranceDocuments();
        }
    }, [policy])

    return(
       
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
                            submit documents
                        </h1>
                    <hr className="md:w-full text-gray-700 bg-gray-700" />
                </div>  
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-5">
                {Object.values(docList).map((doc) =>{
                    {console.log(`documents[${doc}]: ${documents[doc]}`)}
                    return(
                        <div key={doc} className="flex flex-col space-y-4">
                        <div className="flex flex-row space-x-8 items-center">
                            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
                                {doc == "DVLA"? doc : sentenceCase(doc).split('_').join(" ")}
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                        <FileUpload
                            multiple={false}
                            allowSelect={!documents[doc]}
                            defaultImage={documents[doc]? documents[doc]: null}
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
    
                                let file = new File([blobImage], image[0].name, {type: contentType});
                                console.log(file)

                                uploadInsuranceDocument(file, doc);
                                return;
                            } else {
                                let temp = {...documents}
                                delete temp[doc] 
                                setDocuments(temp);
                            }
                        }}
                        />
                    </div>
                </div>
                    )
                })}
          </div>
            <div className="mt-5">
                <button className="bg-primary-main rounded-md px-4 py-2 w-full flex justify-center items-center space-x-2 cursor-pointer"
                onClick={() => handleSubmitOnClick()}>
                    <span>Submit</span>
                    <ChevronRightIcon className="w-4 h-4 mt-0.5" />
                </button>
            </div>
        </div>
    )
};

export default SubmitDocumentsView;

