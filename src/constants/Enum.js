export const offerStates = [
    { value: 0, label: "Bekleyen" },
    { value: 1, label: "Tamamlanmış" },
    { value: 2, label: "Ödenmiş" },
    { value: 3, label: "Reddedilmiş" },
]

export const appointmentOperationStates = [
    { value: 1, label: "Bekleyen" },
    // { value: 2, label: "Ücret Ödenmiş" },
    { value: 3, label: "Reddedilmiş" },
    { value: 4, label: "Onaylanmış" },
    { value: 5, label: "Tamamlanmış" },
    { value: 6, label: "Başarısız" },
]

export const currencyTypes = [
    { value: 1, label: "TL", icon: "₺" },
    { value: 2, label: "Dolar", icon: "$" },
    { value: 3, label: "Euro", icon: "€" },
]

export const legalTextType = {
    "ABOUT": 1,
    "PRIVACYANDTERMSOFUSE": 2,
    "IndividualMembershipAgreement": 3,
    "CorporateMembershipAgreement": 4,
    "EXPRESSCONSENTTEXT": 5, //açık rıza
    "DISCLOSURETEXTANDCOOKIEPOLICY": 6, //aydınlatma metni ve çerez
    "DISTANCESERVICESALESAGREEMENT": 7, //mesafeli hizmet satış 
}