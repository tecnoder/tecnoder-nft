/* eslint-disable no-useless-escape */
export const API_BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_KEY = process.env.REACT_APP_API_KEY;
export const WS_URL = process.env.REACT_APP_WS_URL;
export const SSE_URL = process.env.REACT_APP_SSE_URL;

export const AUTHENTICITY_PRIVATE_URL = process.env.REACT_APP_AUTHENTICITY_PRIVATE_URL;
export const AUTHENTICITY_PUBLIC_URL = process.env.REACT_APP_AUTHENTICITY_PUBLIC_URL;

export const validPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*.!@$%#`'"^&(){}[\]:;<>,.?\/~_+\\=|\-])[A-Za-z\d*.!@$%#`'"^&(){}[\]:;<>,.?\/~_+\\=|\-]{8,}$/);

// export const passwordTipMin8Chars = (password: string) => <div className={/^(.*).{8,}$/.test(password) ? 'text-success' : 'text-warning'}>Password must be minimum 8 characters</div>;

// export const passwordTipNumbers = (password: string) => <div className={/^.*(?=.*[0-9]).*$/.test(password) ? 'text-success' : 'text-warning'}>Must contain a number</div>;

// export const passwordTipSmallChars = (password: string) => <div className={/^.*(?=.*[a-z]).*$/.test(password) ? 'text-success' : 'text-warning'}>Must contain a lowercase letter</div>;

// export const passwordTipCaps = (password: string) => <div className={/^.*(?=.*[A-Z]).*$/.test(password) ? 'text-success' : 'text-warning'}>Must contain an uppercase letter</div>;

// export const passwordTipSpecialChars = (password: string) => <div className={validPasswordRegex.test(password) ? 'text-success' : 'text-warning'}>Must contain one of {'*.!@$%#`\'"^&(){}[\]:;<>,.?\/~_+\\=|\-'} special characters</div>;

export const VALID_SIMPLE_EMAIL = (value: string) => /(.+)@(.+){2,}\.(.+){2,}/.test(value) ? true : false

export const validEmailRegex = new RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

export const validUrlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

export const alphaRegex = new RegExp(/^[a-zA-Z\s]+$/);

export const alphaNumRegex = new RegExp(/^[0-9a-zA-Z\s]+$/);

export const integerRegex = new RegExp(/^[0-9]+$/);

export const decimalRegex = new RegExp(/^\d+(\.\d{1,2})?$/);

export const alphaNumSpecialRegex = new RegExp(/^[A-Za-z\d*.!@$%#`'"^&(){}[\]:;<>,.?\/~_+\\=|\-]+$/);

export const allowedImgExtensions = /(\.bmp|\.cgm|\.djv|\.djvu|\.gif|\.ico|\.ief|\.jp2|\.jpe|\.tiff|\.jpeg|\.png|\.jpg|\.mac|\.pbm|\.pic|\.svg)$/i;
export const allowedAudioExtensions = /(\.m4a|\.flac|\.mp3|\.wav|\.aac)$/i;
export const allowedVideoExtensions = /(\.avi|\.dif|\.dv|\.m4u|\.m4v|\.mov|\.movie|\.mp4|\.mpe|\.mpeg|\.mpg|\.mxu|\.qt)$/i;   

//API endpoints
export const countries = () => [
    { "value": "US", "text": "United States" },
    { "value": "CA", "text": "Canada" },
    { "value": "AF", "text": "Afghanistan" },
    { "value": "AX", "text": "Aland Islands" },
    { "value": "AL", "text": "Albania" },
    { "value": "DZ", "text": "Algeria" },
    { "value": "AS", "text": "American Samoa" },
    { "value": "AD", "text": "Andorra" },
    { "value": "AO", "text": "Angola" },
    { "value": "AI", "text": "Anguilla" },
    { "value": "AQ", "text": "Antarctica" },
    { "value": "AG", "text": "Antigua and Barbuda" },
    { "value": "AR", "text": "Argentina" },
    { "value": "AM", "text": "Armenia" },
    { "value": "AW", "text": "Aruba" },
    { "value": "AU", "text": "Australia" },
    { "value": "AT", "text": "Austria" },
    { "value": "AZ", "text": "Azerbaijan" },
    { "value": "BS", "text": "Bahamas" },
    { "value": "BH", "text": "Bahrain" },
    { "value": "BD", "text": "Bangladesh" },
    { "value": "BB", "text": "Barbados" },
    { "value": "BY", "text": "Belarus" },
    { "value": "BE", "text": "Belgium" },
    { "value": "BZ", "text": "Belize" },
    { "value": "BJ", "text": "Benin" },
    { "value": "BM", "text": "Bermuda" },
    { "value": "BT", "text": "Bhutan" },
    { "value": "BO", "text": "Bolivia" },
    { "value": "BQ", "text": "Bonaire, Saint Eustatius and Saba " },
    { "value": "BA", "text": "Bosnia and Herzegovina" },
    { "value": "BW", "text": "Botswana" },
    { "value": "BV", "text": "Bouvet Island" },
    { "value": "BR", "text": "Brazil" },
    { "value": "IO", "text": "British Indian Ocean Territory" },
    { "value": "VG", "text": "British Virgin Islands" },
    { "value": "BN", "text": "Brunei" },
    { "value": "BG", "text": "Bulgaria" },
    { "value": "BF", "text": "Burkina Faso" },
    { "value": "BI", "text": "Burundi" },
    { "value": "KH", "text": "Cambodia" },
    { "value": "CM", "text": "Cameroon" },
    { "value": "CV", "text": "Cape Verde" },
    { "value": "KY", "text": "Cayman Islands" },
    { "value": "CF", "text": "Central African Republic" },
    { "value": "TD", "text": "Chad" },
    { "value": "CL", "text": "Chile" },
    { "value": "CN", "text": "China" },
    { "value": "CX", "text": "Christmas Island" },
    { "value": "CC", "text": "Cocos Islands" },
    { "value": "CO", "text": "Colombia" },
    { "value": "KM", "text": "Comoros" },
    { "value": "CK", "text": "Cook Islands" },
    { "value": "CR", "text": "Costa Rica" },
    { "value": "HR", "text": "Croatia" },
    { "value": "CU", "text": "Cuba" },
    { "value": "CW", "text": "Curacao" },
    { "value": "CY", "text": "Cyprus" },
    { "value": "CZ", "text": "Czech Republic" },
    { "value": "CD", "text": "Democratic Republic of the Congo" },
    { "value": "DK", "text": "Denmark" },
    { "value": "DJ", "text": "Djibouti" },
    { "value": "DM", "text": "Dominica" },
    { "value": "DO", "text": "Dominican Republic" },
    { "value": "TL", "text": "East Timor" },
    { "value": "EC", "text": "Ecuador" },
    { "value": "EG", "text": "Egypt" },
    { "value": "SV", "text": "El Salvador" },
    { "value": "GQ", "text": "Equatorial Guinea" },
    { "value": "ER", "text": "Eritrea" },
    { "value": "EE", "text": "Estonia" },
    { "value": "ET", "text": "Ethiopia" },
    { "value": "FK", "text": "Falkland Islands" },
    { "value": "FO", "text": "Faroe Islands" },
    { "value": "FJ", "text": "Fiji" },
    { "value": "FI", "text": "Finland" },
    { "value": "FR", "text": "France" },
    { "value": "GF", "text": "French Guiana" },
    { "value": "PF", "text": "French Polynesia" },
    { "value": "TF", "text": "French Southern Territories" },
    { "value": "GA", "text": "Gabon" },
    { "value": "GM", "text": "Gambia" },
    { "value": "GE", "text": "Georgia" },
    { "value": "DE", "text": "Germany" },
    { "value": "GH", "text": "Ghana" },
    { "value": "GI", "text": "Gibraltar" },
    { "value": "GR", "text": "Greece" },
    { "value": "GL", "text": "Greenland" },
    { "value": "GD", "text": "Grenada" },
    { "value": "GP", "text": "Guadeloupe" },
    { "value": "GU", "text": "Guam" },
    { "value": "GT", "text": "Guatemala" },
    { "value": "GG", "text": "Guernsey" },
    { "value": "GN", "text": "Guinea" },
    { "value": "GW", "text": "Guinea-Bissau" },
    { "value": "GY", "text": "Guyana" },
    { "value": "HT", "text": "Haiti" },
    { "value": "HM", "text": "Heard Island and McDonald Islands" },
    { "value": "HN", "text": "Honduras" },
    { "value": "HK", "text": "Hong Kong" },
    { "value": "HU", "text": "Hungary" },
    { "value": "IS", "text": "Iceland" },
    { "value": "IN", "text": "India" },
    { "value": "ID", "text": "Indonesia" },
    { "value": "IR", "text": "Iran" },
    { "value": "IQ", "text": "Iraq" },
    { "value": "IE", "text": "Ireland" },
    { "value": "IM", "text": "Isle of Man" },
    { "value": "IL", "text": "Israel" },
    { "value": "IT", "text": "Italy" },
    { "value": "CI", "text": "Ivory Coast" },
    { "value": "JM", "text": "Jamaica" },
    { "value": "JP", "text": "Japan" },
    { "value": "JE", "text": "Jersey" },
    { "value": "JO", "text": "Jordan" },
    { "value": "KZ", "text": "Kazakhstan" },
    { "value": "KE", "text": "Kenya" },
    { "value": "KI", "text": "Kiribati" },
    { "value": "XK", "text": "Kosovo" },
    { "value": "KW", "text": "Kuwait" },
    { "value": "KG", "text": "Kyrgyzstan" },
    { "value": "LA", "text": "Laos" },
    { "value": "LV", "text": "Latvia" },
    { "value": "LB", "text": "Lebanon" },
    { "value": "LS", "text": "Lesotho" },
    { "value": "LR", "text": "Liberia" },
    { "value": "LY", "text": "Libya" },
    { "value": "LI", "text": "Liechtenstein" },
    { "value": "LT", "text": "Lithuania" },
    { "value": "LU", "text": "Luxembourg" },
    { "value": "MO", "text": "Macao" },
    { "value": "MK", "text": "Macedonia" },
    { "value": "MG", "text": "Madagascar" },
    { "value": "MW", "text": "Malawi" },
    { "value": "MY", "text": "Malaysia" },
    { "value": "MV", "text": "Maldives" },
    { "value": "ML", "text": "Mali" },
    { "value": "MT", "text": "Malta" },
    { "value": "MH", "text": "Marshall Islands" },
    { "value": "MQ", "text": "Martinique" },
    { "value": "MR", "text": "Mauritania" },
    { "value": "MU", "text": "Mauritius" },
    { "value": "YT", "text": "Mayotte" },
    { "value": "MX", "text": "Mexico" },
    { "value": "FM", "text": "Micronesia" },
    { "value": "MD", "text": "Moldova" },
    { "value": "MC", "text": "Monaco" },
    { "value": "MN", "text": "Mongolia" },
    { "value": "ME", "text": "Montenegro" },
    { "value": "MS", "text": "Montserrat" },
    { "value": "MA", "text": "Morocco" },
    { "value": "MZ", "text": "Mozambique" },
    { "value": "MM", "text": "Myanmar" },
    { "value": "NA", "text": "Namibia" },
    { "value": "NR", "text": "Nauru" },
    { "value": "NP", "text": "Nepal" },
    { "value": "NL", "text": "Netherlands" },
    { "value": "NC", "text": "New Caledonia" },
    { "value": "NZ", "text": "New Zealand" },
    { "value": "NI", "text": "Nicaragua" },
    { "value": "NE", "text": "Niger" },
    { "value": "NG", "text": "Nigeria" },
    { "value": "NU", "text": "Niue" },
    { "value": "NF", "text": "Norfolk Island" },
    { "value": "KP", "text": "North Korea" },
    { "value": "MP", "text": "Northern Mariana Islands" },
    { "value": "NO", "text": "Norway" },
    { "value": "OM", "text": "Oman" },
    { "value": "PK", "text": "Pakistan" },
    { "value": "PW", "text": "Palau" },
    { "value": "PS", "text": "Palestinian Territory" },
    { "value": "PA", "text": "Panama" },
    { "value": "PG", "text": "Papua New Guinea" },
    { "value": "PY", "text": "Paraguay" },
    { "value": "PE", "text": "Peru" },
    { "value": "PH", "text": "Philippines" },
    { "value": "PN", "text": "Pitcairn" },
    { "value": "PL", "text": "Poland" },
    { "value": "PT", "text": "Portugal" },
    { "value": "PR", "text": "Puerto Rico" },
    { "value": "QA", "text": "Qatar" },
    { "value": "CG", "text": "Republic of the Congo" },
    { "value": "RE", "text": "Reunion" },
    { "value": "RO", "text": "Romania" },
    { "value": "RU", "text": "Russia" },
    { "value": "RW", "text": "Rwanda" },
    { "value": "BL", "text": "Saint Barthelemy" },
    { "value": "SH", "text": "Saint Helena" },
    { "value": "KN", "text": "Saint Kitts and Nevis" },
    { "value": "LC", "text": "Saint Lucia" },
    { "value": "MF", "text": "Saint Martin" },
    { "value": "PM", "text": "Saint Pierre and Miquelon" },
    { "value": "VC", "text": "Saint Vincent and the Grenadines" },
    { "value": "WS", "text": "Samoa" },
    { "value": "SM", "text": "San Marino" },
    { "value": "ST", "text": "Sao Tome and Principe" },
    { "value": "SA", "text": "Saudi Arabia" },
    { "value": "SN", "text": "Senegal" },
    { "value": "RS", "text": "Serbia" },
    { "value": "SC", "text": "Seychelles" },
    { "value": "SL", "text": "Sierra Leone" },
    { "value": "SG", "text": "Singapore" },
    { "value": "SX", "text": "Sint Maarten" },
    { "value": "SK", "text": "Slovakia" },
    { "value": "SI", "text": "Slovenia" },
    { "value": "SB", "text": "Solomon Islands" },
    { "value": "SO", "text": "Somalia" },
    { "value": "ZA", "text": "South Africa" },
    { "value": "GS", "text": "South Georgia and the South Sandwich Islands" },
    { "value": "KR", "text": "South Korea" },
    { "value": "SS", "text": "South Sudan" },
    { "value": "ES", "text": "Spain" },
    { "value": "LK", "text": "Sri Lanka" },
    { "value": "SD", "text": "Sudan" },
    { "value": "SR", "text": "Suriname" },
    { "value": "SJ", "text": "Svalbard and Jan Mayen" },
    { "value": "SZ", "text": "Swaziland" },
    { "value": "SE", "text": "Sweden" },
    { "value": "CH", "text": "Switzerland" },
    { "value": "SY", "text": "Syria" },
    { "value": "TW", "text": "Taiwan" },
    { "value": "TJ", "text": "Tajikistan" },
    { "value": "TZ", "text": "Tanzania" },
    { "value": "TH", "text": "Thailand" },
    { "value": "TG", "text": "Togo" },
    { "value": "TK", "text": "Tokelau" },
    { "value": "TO", "text": "Tonga" },
    { "value": "TT", "text": "Trinidad and Tobago" },
    { "value": "TN", "text": "Tunisia" },
    { "value": "TR", "text": "Turkey" },
    { "value": "TM", "text": "Turkmenistan" },
    { "value": "TC", "text": "Turks and Caicos Islands" },
    { "value": "TV", "text": "Tuvalu" },
    { "value": "VI", "text": "U.S. Virgin Islands" },
    { "value": "UG", "text": "Uganda" },
    { "value": "UA", "text": "Ukraine" },
    { "value": "AE", "text": "United Arab Emirates" },
    { "value": "GB", "text": "United Kingdom" },
    { "value": "UM", "text": "United States Minor Outlying Islands" },
    { "value": "UY", "text": "Uruguay" },
    { "value": "UZ", "text": "Uzbekistan" },
    { "value": "VU", "text": "Vanuatu" },
    { "value": "VA", "text": "Vatican" },
    { "value": "VE", "text": "Venezuela" },
    { "value": "VN", "text": "Vietnam" },
    { "value": "WF", "text": "Wallis and Futuna" },
    { "value": "EH", "text": "Western Sahara" },
    { "value": "YE", "text": "Yemen" },
    { "value": "ZM", "text": "Zambia" },
    { "value": "ZW", "text": "Zimbabwe" }
  ];
  