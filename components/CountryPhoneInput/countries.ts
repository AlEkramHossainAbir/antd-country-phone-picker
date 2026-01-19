/**
 * Country data interface
 */
export interface Country {
  /** Country name in English */
  name: string;
  /** ISO 3166-1 alpha-2 country code (e.g., "US", "BD") */
  iso2: string;
  /** International dialing code without + (e.g., "1", "880") */
  dialCode: string;
  /** Priority for countries sharing same dial code (lower = higher priority) */
  priority?: number;
  /** Area codes for countries like US/Canada */
  areaCodes?: string[];
  /** Format pattern for phone number (optional) */
  format?: string;
}

/**
 * Comprehensive country data with dialing codes
 * Derived from ITU-T E.164 and common international sources
 */
export const countries: Country[] = [
  { name: "Afghanistan", iso2: "AF", dialCode: "93", format: "+.. .. ... ...." },
  { name: "Albania", iso2: "AL", dialCode: "355", format: "+... .. ... ...." },
  { name: "Algeria", iso2: "DZ", dialCode: "213", format: "+... .. ... ...." },
  { name: "American Samoa", iso2: "AS", dialCode: "1684", format: "+. (...) ...-...."},
  { name: "Andorra", iso2: "AD", dialCode: "376", format: "+... ... ..." },
  { name: "Angola", iso2: "AO", dialCode: "244", format: "+... ... ... ..." },
  { name: "Anguilla", iso2: "AI", dialCode: "1264", format: "+. (...) ...-...."},
  { name: "Antigua and Barbuda", iso2: "AG", dialCode: "1268", format: "+. (...) ...-...."},
  { name: "Argentina", iso2: "AR", dialCode: "54", format: "+.. .. ....-....." },
  { name: "Armenia", iso2: "AM", dialCode: "374", format: "+... .. ......" },
  { name: "Aruba", iso2: "AW", dialCode: "297", format: "+... ... ...." },
  { name: "Australia", iso2: "AU", dialCode: "61", format: "+.. ... ... ..." },
  { name: "Austria", iso2: "AT", dialCode: "43", format: "+.. ... ......." },
  { name: "Azerbaijan", iso2: "AZ", dialCode: "994", format: "+... .. ... .. .." },
  { name: "Bahamas", iso2: "BS", dialCode: "1242", format: "+. (...) ...-...."},
  { name: "Bahrain", iso2: "BH", dialCode: "973", format: "+... .... ...." },
  { name: "Bangladesh", iso2: "BD", dialCode: "880", format: "+... ....-......" },
  { name: "Barbados", iso2: "BB", dialCode: "1246", format: "+. (...) ...-...."},
  { name: "Belarus", iso2: "BY", dialCode: "375", format: "+... .. ... .. .." },
  { name: "Belgium", iso2: "BE", dialCode: "32", format: "+.. ... .. .. .." },
  { name: "Belize", iso2: "BZ", dialCode: "501", format: "+... ...-...."},
  { name: "Benin", iso2: "BJ", dialCode: "229", format: "+... .. .. .. .." },
  { name: "Bermuda", iso2: "BM", dialCode: "1441", format: "+. (...) ...-...."},
  { name: "Bhutan", iso2: "BT", dialCode: "975", format: "+... .. .. .. .." },
  { name: "Bolivia", iso2: "BO", dialCode: "591", format: "+... .-...-...." },
  { name: "Bosnia and Herzegovina", iso2: "BA", dialCode: "387", format: "+... .. ...-...." },
  { name: "Botswana", iso2: "BW", dialCode: "267", format: "+... .. ... ..." },
  { name: "Brazil", iso2: "BR", dialCode: "55", format: "+.. .. .....-....." },
  { name: "British Indian Ocean Territory", iso2: "IO", dialCode: "246", format: "+... ... ...." },
  { name: "British Virgin Islands", iso2: "VG", dialCode: "1284", format: "+. (...) ...-...."},
  { name: "Brunei", iso2: "BN", dialCode: "673", format: "+... ... ...." },
  { name: "Bulgaria", iso2: "BG", dialCode: "359", format: "+... . ... ...." },
  { name: "Burkina Faso", iso2: "BF", dialCode: "226", format: "+... .. .. .. .." },
  { name: "Burundi", iso2: "BI", dialCode: "257", format: "+... .. .. .. .." },
  { name: "Cambodia", iso2: "KH", dialCode: "855", format: "+... .. ... ..." },
  { name: "Cameroon", iso2: "CM", dialCode: "237", format: "+... .... ...." },
  { name: "Canada", iso2: "CA", dialCode: "1", priority: 1, format: "+. (...) ...-....", areaCodes: ["204","226","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"] },
  { name: "Cape Verde", iso2: "CV", dialCode: "238", format: "+... ... .. .." },
  { name: "Caribbean Netherlands", iso2: "BQ", dialCode: "599", priority: 1, format: "+... ... ...." },
  { name: "Cayman Islands", iso2: "KY", dialCode: "1345", format: "+. (...) ...-...."},
  { name: "Central African Republic", iso2: "CF", dialCode: "236", format: "+... .. .. .. .." },
  { name: "Chad", iso2: "TD", dialCode: "235", format: "+... .. .. .. .." },
  { name: "Chile", iso2: "CL", dialCode: "56", format: "+.. . .... ...." },
  { name: "China", iso2: "CN", dialCode: "86", format: "+.. ... .... ...." },
  { name: "Christmas Island", iso2: "CX", dialCode: "61", priority: 2, format: "+.. . .... ...." },
  { name: "Cocos (Keeling) Islands", iso2: "CC", dialCode: "61", priority: 3, format: "+.. . .... ...." },
  { name: "Colombia", iso2: "CO", dialCode: "57", format: "+.. ... ... ...." },
  { name: "Comoros", iso2: "KM", dialCode: "269", format: "+... ... .. .." },
  { name: "Congo (DRC)", iso2: "CD", dialCode: "243", format: "+... .. ... ...." },
  { name: "Congo (Republic)", iso2: "CG", dialCode: "242", format: "+... .. ... ...." },
  { name: "Cook Islands", iso2: "CK", dialCode: "682", format: "+... .. ..." },
  { name: "Costa Rica", iso2: "CR", dialCode: "506", format: "+... ....-...." },
  { name: "Croatia", iso2: "HR", dialCode: "385", format: "+... .. ... ...." },
  { name: "Cuba", iso2: "CU", dialCode: "53", format: "+.. . ... ...." },
  { name: "Curaçao", iso2: "CW", dialCode: "599", priority: 0, format: "+... . ... ...." },
  { name: "Cyprus", iso2: "CY", dialCode: "357", format: "+... .. ......" },
  { name: "Czech Republic", iso2: "CZ", dialCode: "420", format: "+... ... ... ..." },
  { name: "Denmark", iso2: "DK", dialCode: "45", format: "+.. .. .. .. .." },
  { name: "Djibouti", iso2: "DJ", dialCode: "253", format: "+... .. .. .. .." },
  { name: "Dominica", iso2: "DM", dialCode: "1767", format: "+. (...) ...-...."},
  { name: "Dominican Republic", iso2: "DO", dialCode: "1", priority: 2, areaCodes: ["809","829","849"], format: "+. (...) ...-...."},
  { name: "Ecuador", iso2: "EC", dialCode: "593", format: "+... .. ... ...." },
  { name: "Egypt", iso2: "EG", dialCode: "20", format: "+.. ... ... ...." },
  { name: "El Salvador", iso2: "SV", dialCode: "503", format: "+... .... ...." },
  { name: "Equatorial Guinea", iso2: "GQ", dialCode: "240", format: "+... ... ... ..." },
  { name: "Eritrea", iso2: "ER", dialCode: "291", format: "+... . ... ..." },
  { name: "Estonia", iso2: "EE", dialCode: "372", format: "+... .... ...." },
  { name: "Eswatini", iso2: "SZ", dialCode: "268", format: "+... .... ...." },
  { name: "Ethiopia", iso2: "ET", dialCode: "251", format: "+... .. ... ...." },
  { name: "Falkland Islands", iso2: "FK", dialCode: "500", format: "+... ....." },
  { name: "Faroe Islands", iso2: "FO", dialCode: "298", format: "+... ......" },
  { name: "Fiji", iso2: "FJ", dialCode: "679", format: "+... ... ...." },
  { name: "Finland", iso2: "FI", dialCode: "358", format: "+... .. ... .. .." },
  { name: "France", iso2: "FR", dialCode: "33", format: "+.. . .. .. .. .." },
  { name: "French Guiana", iso2: "GF", dialCode: "594", format: "+... ... .. .. .." },
  { name: "French Polynesia", iso2: "PF", dialCode: "689", format: "+... .. .. .. .." },
  { name: "Gabon", iso2: "GA", dialCode: "241", format: "+... .. .. .. .." },
  { name: "Gambia", iso2: "GM", dialCode: "220", format: "+... ... ...." },
  { name: "Georgia", iso2: "GE", dialCode: "995", format: "+... ... ... ..." },
  { name: "Germany", iso2: "DE", dialCode: "49", format: "+.. ... ........" },
  { name: "Ghana", iso2: "GH", dialCode: "233", format: "+... .. ... ...." },
  { name: "Gibraltar", iso2: "GI", dialCode: "350", format: "+... ... ....." },
  { name: "Greece", iso2: "GR", dialCode: "30", format: "+.. ... ... ...." },
  { name: "Greenland", iso2: "GL", dialCode: "299", format: "+... .. .. .." },
  { name: "Grenada", iso2: "GD", dialCode: "1473", format: "+. (...) ...-...."},
  { name: "Guadeloupe", iso2: "GP", dialCode: "590", priority: 0, format: "+... ... .. .. .." },
  { name: "Guam", iso2: "GU", dialCode: "1671", format: "+. (...) ...-...."},
  { name: "Guatemala", iso2: "GT", dialCode: "502", format: "+... ....-...." },
  { name: "Guernsey", iso2: "GG", dialCode: "44", priority: 1, format: "+.. .... ......" },
  { name: "Guinea", iso2: "GN", dialCode: "224", format: "+... ... ... ..." },
  { name: "Guinea-Bissau", iso2: "GW", dialCode: "245", format: "+... ... ...." },
  { name: "Guyana", iso2: "GY", dialCode: "592", format: "+... ... ...." },
  { name: "Haiti", iso2: "HT", dialCode: "509", format: "+... .... ...." },
  { name: "Honduras", iso2: "HN", dialCode: "504", format: "+... ....-...." },
  { name: "Hong Kong", iso2: "HK", dialCode: "852", format: "+... .... ...." },
  { name: "Hungary", iso2: "HU", dialCode: "36", format: "+.. . ... ...." },
  { name: "Iceland", iso2: "IS", dialCode: "354", format: "+... ... ...." },
  { name: "India", iso2: "IN", dialCode: "91", format: "+.. ..... ....." },
  { name: "Indonesia", iso2: "ID", dialCode: "62", format: "+.. ...-...-..." },
  { name: "Iran", iso2: "IR", dialCode: "98", format: "+.. ... ... ...." },
  { name: "Iraq", iso2: "IQ", dialCode: "964", format: "+... ... ... ...." },
  { name: "Ireland", iso2: "IE", dialCode: "353", format: "+... .. ... ...." },
  { name: "Isle of Man", iso2: "IM", dialCode: "44", priority: 2, format: "+.. .... ......" },
  { name: "Israel", iso2: "IL", dialCode: "972", format: "+... .-...-....." },
  { name: "Italy", iso2: "IT", dialCode: "39", format: "+.. ... ... ...." },
  { name: "Ivory Coast", iso2: "CI", dialCode: "225", format: "+... .. .. .. .." },
  { name: "Jamaica", iso2: "JM", dialCode: "1876", format: "+. (...) ...-...."},
  { name: "Japan", iso2: "JP", dialCode: "81", format: "+.. .. .... ...." },
  { name: "Jersey", iso2: "JE", dialCode: "44", priority: 3, format: "+.. .... ......" },
  { name: "Jordan", iso2: "JO", dialCode: "962", format: "+... . .... ...." },
  { name: "Kazakhstan", iso2: "KZ", dialCode: "7", priority: 1, format: "+. ... ... .. .." },
  { name: "Kenya", iso2: "KE", dialCode: "254", format: "+... ... ......" },
  { name: "Kiribati", iso2: "KI", dialCode: "686", format: "+... .. ..." },
  { name: "Kosovo", iso2: "XK", dialCode: "383", format: "+... .. ... ..." },
  { name: "Kuwait", iso2: "KW", dialCode: "965", format: "+... .... ...." },
  { name: "Kyrgyzstan", iso2: "KG", dialCode: "996", format: "+... ... ... ..." },
  { name: "Laos", iso2: "LA", dialCode: "856", format: "+... .. .. ... ..." },
  { name: "Latvia", iso2: "LV", dialCode: "371", format: "+... .. ... ..." },
  { name: "Lebanon", iso2: "LB", dialCode: "961", format: "+... .. ... ..." },
  { name: "Lesotho", iso2: "LS", dialCode: "266", format: "+... .... ...." },
  { name: "Liberia", iso2: "LR", dialCode: "231", format: "+... ... ... ..." },
  { name: "Libya", iso2: "LY", dialCode: "218", format: "+... .. ... ...." },
  { name: "Liechtenstein", iso2: "LI", dialCode: "423", format: "+... ... ...." },
  { name: "Lithuania", iso2: "LT", dialCode: "370", format: "+... ... ....." },
  { name: "Luxembourg", iso2: "LU", dialCode: "352", format: "+... ... ... ..." },
  { name: "Macau", iso2: "MO", dialCode: "853", format: "+... .... ...." },
  { name: "Madagascar", iso2: "MG", dialCode: "261", format: "+... .. .. ... .." },
  { name: "Malawi", iso2: "MW", dialCode: "265", format: "+... ... ... ..." },
  { name: "Malaysia", iso2: "MY", dialCode: "60", format: "+.. ..-.... ...." },
  { name: "Maldives", iso2: "MV", dialCode: "960", format: "+... ... ...." },
  { name: "Mali", iso2: "ML", dialCode: "223", format: "+... .. .. .. .." },
  { name: "Malta", iso2: "MT", dialCode: "356", format: "+... .... ...." },
  { name: "Marshall Islands", iso2: "MH", dialCode: "692", format: "+... ... ...." },
  { name: "Martinique", iso2: "MQ", dialCode: "596", format: "+... ... .. .. .." },
  { name: "Mauritania", iso2: "MR", dialCode: "222", format: "+... .. .. .. .." },
  { name: "Mauritius", iso2: "MU", dialCode: "230", format: "+... .... ...." },
  { name: "Mayotte", iso2: "YT", dialCode: "262", priority: 1, format: "+... ... .. .. .." },
  { name: "Mexico", iso2: "MX", dialCode: "52", format: "+.. ... ... ...." },
  { name: "Micronesia", iso2: "FM", dialCode: "691", format: "+... ... ...." },
  { name: "Moldova", iso2: "MD", dialCode: "373", format: "+... .... ...." },
  { name: "Monaco", iso2: "MC", dialCode: "377", format: "+... .. ... ..." },
  { name: "Mongolia", iso2: "MN", dialCode: "976", format: "+... .... ...." },
  { name: "Montenegro", iso2: "ME", dialCode: "382", format: "+... .. ... ..." },
  { name: "Montserrat", iso2: "MS", dialCode: "1664", format: "+. (...) ...-...."},
  { name: "Morocco", iso2: "MA", dialCode: "212", format: "+... .-.. .. .. .." },
  { name: "Mozambique", iso2: "MZ", dialCode: "258", format: "+... .. ... ...." },
  { name: "Myanmar", iso2: "MM", dialCode: "95", format: "+.. ... ... ..." },
  { name: "Namibia", iso2: "NA", dialCode: "264", format: "+... .. ... ...." },
  { name: "Nauru", iso2: "NR", dialCode: "674", format: "+... ... ...." },
  { name: "Nepal", iso2: "NP", dialCode: "977", format: "+... .. .... ...." },
  { name: "Netherlands", iso2: "NL", dialCode: "31", format: "+.. . ........" },
  { name: "New Caledonia", iso2: "NC", dialCode: "687", format: "+... .. .. .." },
  { name: "New Zealand", iso2: "NZ", dialCode: "64", format: "+.. .. ... ...." },
  { name: "Nicaragua", iso2: "NI", dialCode: "505", format: "+... .... ...." },
  { name: "Niger", iso2: "NE", dialCode: "227", format: "+... .. .. .. .." },
  { name: "Nigeria", iso2: "NG", dialCode: "234", format: "+... ... ... ...." },
  { name: "Niue", iso2: "NU", dialCode: "683", format: "+... ...." },
  { name: "Norfolk Island", iso2: "NF", dialCode: "672", format: "+... .. ...." },
  { name: "North Korea", iso2: "KP", dialCode: "850", format: "+... ... ... ...." },
  { name: "North Macedonia", iso2: "MK", dialCode: "389", format: "+... .. ... ..." },
  { name: "Northern Mariana Islands", iso2: "MP", dialCode: "1670", format: "+. (...) ...-...."},
  { name: "Norway", iso2: "NO", dialCode: "47", format: "+.. ... .. ..." },
  { name: "Oman", iso2: "OM", dialCode: "968", format: "+... .... ...." },
  { name: "Pakistan", iso2: "PK", dialCode: "92", format: "+.. ... ......." },
  { name: "Palau", iso2: "PW", dialCode: "680", format: "+... ... ...." },
  { name: "Palestine", iso2: "PS", dialCode: "970", format: "+... ... ... ..." },
  { name: "Panama", iso2: "PA", dialCode: "507", format: "+... ....-...." },
  { name: "Papua New Guinea", iso2: "PG", dialCode: "675", format: "+... ... ...." },
  { name: "Paraguay", iso2: "PY", dialCode: "595", format: "+... ... ......" },
  { name: "Peru", iso2: "PE", dialCode: "51", format: "+.. ... ... ..." },
  { name: "Philippines", iso2: "PH", dialCode: "63", format: "+.. ... ... ...." },
  { name: "Poland", iso2: "PL", dialCode: "48", format: "+.. ... ... ..." },
  { name: "Portugal", iso2: "PT", dialCode: "351", format: "+... ... ... ..." },
  { name: "Puerto Rico", iso2: "PR", dialCode: "1", priority: 3, areaCodes: ["787","939"], format: "+. (...) ...-...."},
  { name: "Qatar", iso2: "QA", dialCode: "974", format: "+... .... ...." },
  { name: "Réunion", iso2: "RE", dialCode: "262", priority: 0, format: "+... ... .. .. .." },
  { name: "Romania", iso2: "RO", dialCode: "40", format: "+.. ... ... ..." },
  { name: "Russia", iso2: "RU", dialCode: "7", priority: 0, format: "+. ... ... .. .." },
  { name: "Rwanda", iso2: "RW", dialCode: "250", format: "+... ... ... ..." },
  { name: "Saint Barthélemy", iso2: "BL", dialCode: "590", priority: 1, format: "+... ... .. .. .." },
  { name: "Saint Helena", iso2: "SH", dialCode: "290", format: "+... ...." },
  { name: "Saint Kitts and Nevis", iso2: "KN", dialCode: "1869", format: "+. (...) ...-...."},
  { name: "Saint Lucia", iso2: "LC", dialCode: "1758", format: "+. (...) ...-...."},
  { name: "Saint Martin", iso2: "MF", dialCode: "590", priority: 2, format: "+... ... .. .. .." },
  { name: "Saint Pierre and Miquelon", iso2: "PM", dialCode: "508", format: "+... .. .. .." },
  { name: "Saint Vincent and the Grenadines", iso2: "VC", dialCode: "1784", format: "+. (...) ...-...."},
  { name: "Samoa", iso2: "WS", dialCode: "685", format: "+... .. ...." },
  { name: "San Marino", iso2: "SM", dialCode: "378", format: "+... .... ......" },
  { name: "São Tomé and Príncipe", iso2: "ST", dialCode: "239", format: "+... ... ...." },
  { name: "Saudi Arabia", iso2: "SA", dialCode: "966", format: "+... .. ... ...." },
  { name: "Senegal", iso2: "SN", dialCode: "221", format: "+... .. ... .. .." },
  { name: "Serbia", iso2: "RS", dialCode: "381", format: "+... .. ... ...." },
  { name: "Seychelles", iso2: "SC", dialCode: "248", format: "+... . ... ..." },
  { name: "Sierra Leone", iso2: "SL", dialCode: "232", format: "+... .. ......" },
  { name: "Singapore", iso2: "SG", dialCode: "65", format: "+.. .... ...." },
  { name: "Sint Maarten", iso2: "SX", dialCode: "1721", format: "+. (...) ...-...."},
  { name: "Slovakia", iso2: "SK", dialCode: "421", format: "+... ... ... ..." },
  { name: "Slovenia", iso2: "SI", dialCode: "386", format: "+... .. ... ..." },
  { name: "Solomon Islands", iso2: "SB", dialCode: "677", format: "+... ....." },
  { name: "Somalia", iso2: "SO", dialCode: "252", format: "+... .. ... ..." },
  { name: "South Africa", iso2: "ZA", dialCode: "27", format: "+.. .. ... ...." },
  { name: "South Korea", iso2: "KR", dialCode: "82", format: "+.. .. .... ...." },
  { name: "South Sudan", iso2: "SS", dialCode: "211", format: "+... ... ... ..." },
  { name: "Spain", iso2: "ES", dialCode: "34", format: "+.. ... ... ..." },
  { name: "Sri Lanka", iso2: "LK", dialCode: "94", format: "+.. .. ... ...." },
  { name: "Sudan", iso2: "SD", dialCode: "249", format: "+... .. ... ...." },
  { name: "Suriname", iso2: "SR", dialCode: "597", format: "+... ... ..." },
  { name: "Svalbard and Jan Mayen", iso2: "SJ", dialCode: "47", priority: 1, format: "+.. ... .. ..." },
  { name: "Sweden", iso2: "SE", dialCode: "46", format: "+.. .. ... .. .." },
  { name: "Switzerland", iso2: "CH", dialCode: "41", format: "+.. .. ... .. .." },
  { name: "Syria", iso2: "SY", dialCode: "963", format: "+... ... ... ..." },
  { name: "Taiwan", iso2: "TW", dialCode: "886", format: "+... .... ...." },
  { name: "Tajikistan", iso2: "TJ", dialCode: "992", format: "+... .. ... ...." },
  { name: "Tanzania", iso2: "TZ", dialCode: "255", format: "+... .. ... ...." },
  { name: "Thailand", iso2: "TH", dialCode: "66", format: "+.. .. ... ...." },
  { name: "Timor-Leste", iso2: "TL", dialCode: "670", format: "+... ... ...." },
  { name: "Togo", iso2: "TG", dialCode: "228", format: "+... .. .. .. .." },
  { name: "Tokelau", iso2: "TK", dialCode: "690", format: "+... ...." },
  { name: "Tonga", iso2: "TO", dialCode: "676", format: "+... ....." },
  { name: "Trinidad and Tobago", iso2: "TT", dialCode: "1868", format: "+. (...) ...-...."},
  { name: "Tunisia", iso2: "TN", dialCode: "216", format: "+... .. ... ..." },
  { name: "Turkey", iso2: "TR", dialCode: "90", format: "+.. ... ... .. .." },
  { name: "Turkmenistan", iso2: "TM", dialCode: "993", format: "+... .. ......" },
  { name: "Turks and Caicos Islands", iso2: "TC", dialCode: "1649", format: "+. (...) ...-...."},
  { name: "Tuvalu", iso2: "TV", dialCode: "688", format: "+... ....." },
  { name: "Uganda", iso2: "UG", dialCode: "256", format: "+... ... ......" },
  { name: "Ukraine", iso2: "UA", dialCode: "380", format: "+... .. ... .. .." },
  { name: "United Arab Emirates", iso2: "AE", dialCode: "971", format: "+... .. ... ...." },
  { name: "United Kingdom", iso2: "GB", dialCode: "44", format: "+.. .... ......" },
  { name: "United States", iso2: "US", dialCode: "1", priority: 0, format: "+. (...) ...-....", areaCodes: ["201","202","203","205","206","207","208","209","210","212","213","214","215","216","217","218","219","220","224","225","228","229","231","234","239","240","248","251","252","253","254","256","260","262","267","269","270","272","276","281","283","301","302","303","304","305","307","308","309","310","312","313","314","315","316","317","318","319","320","321","323","325","330","331","334","336","337","339","346","347","351","352","360","361","364","380","385","386","401","402","404","405","406","407","408","409","410","412","413","414","415","417","419","423","424","425","430","432","434","435","440","442","443","447","458","469","470","475","478","479","480","484","501","502","503","504","505","507","508","509","510","512","513","515","516","517","518","520","530","531","534","539","540","541","551","559","561","562","563","564","567","570","571","573","574","575","580","585","586","601","602","603","605","606","607","608","609","610","612","614","615","616","617","618","619","620","623","626","628","629","630","631","636","641","646","650","651","657","660","661","662","667","669","678","680","681","682","684","689","701","702","703","704","706","707","708","712","713","714","715","716","717","718","719","720","724","725","727","731","732","734","737","740","743","747","754","757","760","762","763","765","769","770","772","773","774","775","779","781","785","786","801","802","803","804","805","806","808","810","812","813","814","815","816","817","818","828","830","831","832","843","845","847","848","850","854","856","857","858","859","860","862","863","864","865","870","872","878","901","903","904","906","907","908","909","910","912","913","914","915","916","917","918","919","920","925","928","929","930","931","934","936","937","938","940","941","947","949","951","952","954","956","959","970","971","972","973","975","978","979","980","984","985","989"] },
  { name: "Uruguay", iso2: "UY", dialCode: "598", format: "+... .... ...." },
  { name: "US Virgin Islands", iso2: "VI", dialCode: "1340", format: "+. (...) ...-...."},
  { name: "Uzbekistan", iso2: "UZ", dialCode: "998", format: "+... .. ... .. .." },
  { name: "Vanuatu", iso2: "VU", dialCode: "678", format: "+... ....." },
  { name: "Vatican City", iso2: "VA", dialCode: "39", priority: 1, format: "+.. .. .... ...." },
  { name: "Venezuela", iso2: "VE", dialCode: "58", format: "+.. ...-......." },
  { name: "Vietnam", iso2: "VN", dialCode: "84", format: "+.. .. .... ..." },
  { name: "Wallis and Futuna", iso2: "WF", dialCode: "681", format: "+... .. .. .." },
  { name: "Western Sahara", iso2: "EH", dialCode: "212", priority: 1, format: "+... .. ... ...." },
  { name: "Yemen", iso2: "YE", dialCode: "967", format: "+... ... ... ..." },
  { name: "Zambia", iso2: "ZM", dialCode: "260", format: "+... .. ... ...." },
  { name: "Zimbabwe", iso2: "ZW", dialCode: "263", format: "+... .. ... ...." },
];

/**
 * Create a map for quick country lookup by ISO2 code
 */
export const countryByIso2 = new Map<string, Country>(
  countries.map((country) => [country.iso2.toUpperCase(), country])
);

/**
 * Create a map for quick country lookup by dial code
 * Note: Some dial codes are shared by multiple countries
 */
export const countriesByDialCode = new Map<string, Country[]>();
countries.forEach((country) => {
  const existing = countriesByDialCode.get(country.dialCode) || [];
  existing.push(country);
  countriesByDialCode.set(country.dialCode, existing);
});

/**
 * Get country by ISO2 code
 */
export function getCountryByIso2(iso2: string): Country | undefined {
  return countryByIso2.get(iso2.toUpperCase());
}

/**
 * Get countries by dial code
 */
export function getCountriesByDialCode(dialCode: string): Country[] {
  // Remove leading + if present
  const code = dialCode.replace(/^\+/, '');
  return countriesByDialCode.get(code) || [];
}

/**
 * Find best matching country for a dial code (considering priority)
 */
export function getBestCountryForDialCode(dialCode: string): Country | undefined {
  const matches = getCountriesByDialCode(dialCode);
  if (matches.length === 0) return undefined;
  
  // Sort by priority (lower = higher priority)
  return matches.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))[0];
}

/**
 * Search countries by name, ISO2 code, or dial code
 */
export function searchCountries(query: string, countryList: Country[] = countries): Country[] {
  const normalizedQuery = query.toLowerCase().replace(/^\+/, '');
  
  return countryList.filter((country) => {
    const matchesName = country.name.toLowerCase().includes(normalizedQuery);
    const matchesIso2 = country.iso2.toLowerCase().includes(normalizedQuery);
    const matchesDialCode = country.dialCode.includes(normalizedQuery);
    
    return matchesName || matchesIso2 || matchesDialCode;
  });
}

/**
 * Validate if a string is a valid dial code
 */
export function isValidDialCode(code: string): boolean {
  const normalizedCode = code.replace(/^\+/, '');
  return countriesByDialCode.has(normalizedCode);
}

/**
 * Guess country from phone number based on dial code
 */
export function guessCountryFromNumber(phoneNumber: string): Country | undefined {
  // Remove non-digit characters except +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // Try to match dial codes from longest to shortest
  for (let i = 4; i >= 1; i--) {
    const potentialCode = cleaned.replace(/^\+/, '').slice(0, i);
    const country = getBestCountryForDialCode(potentialCode);
    if (country) return country;
  }
  
  return undefined;
}

/**
 * Default country (United States)
 */
export const defaultCountry: Country = countries.find((c) => c.iso2 === 'US')!;
