import { useEffect, useState } from "react";
import intlTelInput from 'intl-tel-input';

export default function InternationalInput({ firstLoad, defaultValue, name, defaultCountry, label, className, disabled, onValueChange, autoFocus }) {
    const [phone, setPhone] = useState("");
    const [val, setVal] = useState("");

    useEffect(() => {
        let mounted = true;

        const input = document.querySelector(`#${name}`);
        let phoneInstance = intlTelInput(input, {
            defaultCountry: [defaultCountry || "gh"],
            initialCountry: defaultCountry || "gh",
            onlyCountries: ['gh','in'],
            // onlyCountries: ["gh", "dz", "ao", "bj", "bw", "bf", "bi", "cm", "cf", "td", "cd", "cg", "ci", "dj", "eg", "gq", "er", "et", "ga", "gm", "ke", "ls", "lr", "ly", "mw", "ml", "mr", "mu", "ma", "mz", "na", "ne", "ng", "pg", "rw", "sn", "sc", "sl", "so", "za", "ss", "sd", "tz", "tg", "ug", "zm", "zw"],
            // allowDropdown: true,
            // separateDialCode: true,
            // nationalMode: true,
            // separateDialCode: true,
            autoPlaceholder: "aggressive",
            utilsScript: "/js/intl-tel-input-utils.min.js" // for formatting/placeholders etc
        });

        setPhone(phoneInstance)

        document.querySelectorAll(".iti").forEach(a => a.style.display = "block");
        autoFocus && document.querySelector(`#${name}`).focus()

        return () => {
            mounted = false;
        };
    }, []);


    return (
        <div className="flex flex-col box-border w-full p-0 font-medium text-xs">
            {label &&
                <label htmlFor={name} className={label.classNames}>
                    {label.text}
                </label>
            }
            <input
                type="tel"
                className={`${className} border outline-none border-swooveGray-background-pressed`}
                id={name}
                value={val}
                name={name}
                disabled={disabled}
                onChange={e => {
                    setVal(e.currentTarget.value);
                    // phone?.isValidNumber() ?
                    //     (onValueChange(name, phone?.getNumber(), phone?.isValidNumber())) :
                    //     (onValueChange(name, e.currentTarget.value, false));
                }}
                onBlur={e => {
                    console.log(phone.selectedCountryData)
                    let dial_code = phone.selectedCountryData.dialCode
                    console.log(dial_code)
                    setVal(phone?.getNumber().split('+')[1] ?? "");
                    phone?.isValidNumber() ?
                        (onValueChange(name, phone?.getNumber(), phone?.isValidNumber(), dial_code)) :
                        (onValueChange(name, e.currentTarget.value, false, dial_code));
                }}
                style={{ pointerEvents: disabled ? 'none' : 'auto' }}
            />
        </div>
    )
}