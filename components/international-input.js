import { useEffect, useState } from "react";



const loadScript = (type, url, callback) => {

    var script = document.createElement(type);

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = () => { };
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }
    switch (type) {
        case "script":
            script.type = "text/javascript";
            script.src = url;
            break;
        default:
            script.rel = "stylesheet";
            script.href = url;
    }

    document.getElementsByTagName("head")[0].appendChild(script);
};

function intNumber(options, cb) {
    if (process.browser) {
        setTimeout(() => {
            var phone = window.intlTelInput(document.querySelector(`#${options.name}`), {
                defaultCountry: [options.defaultCountry || "gh"],
                initialCountry: options.defaultCountry || "gh",
                // onlyCountries: ["gh", "dz", "ao", "bj", "bw", "bf", "bi", "cm", "cf", "td", "cd", "cg", "ci", "dj", "eg", "gq", "er", "et", "ga", "gm", "ke", "ls", "lr", "ly", "mw", "ml", "mr", "mu", "ma", "mz", "na", "ne", "ng", "pg", "rw", "sn", "sc", "sl", "so", "za", "ss", "sd", "tz", "tg", "ug", "zm", "zw"],
                // allowDropdown: true,
                // separateDialCode: true,
                nationalMode: true,
                autoPlaceholder: "aggressive",
                utilsScript: "/js/intl-tel-input-utils.min.js" // for formatting/placeholders etc
            });
            document.querySelectorAll(".iti").forEach(a => a.style.display = "block");

            options.focus && document.querySelector(`#${options.name}`).focus()

            cb(phone, phone.options.onlyCountries);
        }, 200);
    }
}

export default function InternationalInput({ firstLoad, defaultValue, name, defaultCountry, label, className, disabled, onValueChange, autoFocus }) {
    const [phone, setPhone] = useState(null);
    const [val, setVal] = useState("");

    useEffect(() => {
        setVal(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if (firstLoad === true) {
            loadScript(
                'script',
                `/js/intl-tel-input-utils.min.js`,
                () => {
                    // console.log('utilis script loaded successfully');
                }
            );
            loadScript(
                'script',
                `/js/intlTelInput.js`,
                () => {
                    // console.log('phone format js file loaded successfully');
                    intNumber({
                        name: name,
                        defaultCountry: defaultCountry,
                        focus: firstLoad && autoFocus
                    }, function (res, countries_count) {
                        // console.log(countries_count.length);
                        setPhone(res);
                    });
                }
            );
        } else {
            setTimeout(() => {
                // console.log('phone format js files already loaded... waiting for 2s then load script on input');
                intNumber({
                    name: name,
                    defaultCountry: defaultCountry
                }, function (res, countries_count) {
                    // console.log(countries_count.length);
                    setPhone(res);
                });
            }, 2000);
        }
    }, []);

    return (
        <>
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
                    setVal(phone?.getNumber());
                    phone?.isValidNumber() ?
                        (onValueChange(name, phone?.getNumber(), phone?.isValidNumber())) :
                        (onValueChange(name, e.currentTarget.value, false));
                }}
                style={{ pointerEvents: disabled ? 'none' : 'auto' }}
            />
        </>
    )
}