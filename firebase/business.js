class Business {
  constructor(
    agreedToBusinessUserTerms,
    businessEmail,
    businessLicense,
    eventsHosted,
    mainContactID,
    monthlyPayment,
    photo,
    profileCompletion,
    type,
    verified
  ) {
    this.agreedToBusinessUserTerms = agreedToBusinessUserTerms;
    this.businessEmail = businessEmail;
    this.businessLicense = businessLicense;
    this.eventsHosted = eventsHosted;
    this.mainContactID = mainContactID;
    this.monthlyPayment = monthlyPayment;
    this.photo = photo;
    this.profileCompletion = profileCompletion;
    this.type = type;
    this.verified = verified;
  }
}

const newBusiness = (
  agreedToBusinessUserTerms,
  businessEmail,
  businessLicense,
  eventsHosted,
  mainContactID,
  monthlyPayment,
  photo,
  profileCompletion,
  type,
  verified
) => {
  return new Business(
    agreedToBusinessUserTerms, // boolean
    businessEmail, // string
    businessLicense, // reference (to firebase storage)
    eventsHosted, // array of strings
    mainContactID, // array of strings
    monthlyPayment, // number
    photo, // reference (to firebase storage)
    profileCompletion, // number (1 - 100 --> will be used as a percentage)
    type, // string
    verified // boolean
  );
};

export default newBusiness;
