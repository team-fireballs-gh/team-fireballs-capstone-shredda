class User {
  constructor(
    interests,
    aboutMe,
    agreedToUserTerms,
    birthday,
    drinker,
    education,
    email,
    eventsAttended,
    eventsInterested,
    genderIdentity,
    idVerified,
    jobTitle,
    milesWillingToTravel,
    parent,
    phone,
    politicalViews,
    profilePhoto,
    pronouns,
    religiousBeliefs,
    sexuality,
    sharedPhotos,
    smoker,
    userType,
    username,
    videos,
    wantsToMeet
  ) {
    this.interests = interests;
    this.aboutMe = aboutMe;
    this.agreedToUserTerms = agreedToUserTerms;
    this.birthday = birthday;
    this.drinker = drinker;
    this.education = education;
    this.email = email;
    this.eventsAttended = eventsAttended;
    this.eventsInterested = eventsInterested;
    this.genderIdentity = genderIdentity;
    this.idVerified = idVerified;
    this.jobTitle = jobTitle;
    this.milesWillingToTravel = milesWillingToTravel;
    this.parent = parent;
    this.phone = phone;
    this.politicalViews = politicalViews;
    this.profilePhoto = profilePhoto;
    this.pronouns = pronouns;
    this.religiousBeliefs = religiousBeliefs;
    this.sexuality = sexuality;
    this.sharedPhotos = sharedPhotos;
    this.smoker = smoker;
    this.userType = userType;
    this.username = username;
    this.videos = videos;
    this.wantsToMeet = wantsToMeet;
  }
}

const newUser = (
  interests,
  aboutMe,
  agreedToUserTerms,
  birthday,
  drinker,
  education,
  email,
  eventsAttended,
  eventsInterested,
  genderIdentity,
  idVerified,
  jobTitle,
  milesWillingToTravel,
  parent,
  phone,
  politicalViews,
  profilePhoto,
  pronouns,
  religiousBeliefs,
  sexuality,
  sharedPhotos,
  smoker,
  userType,
  username,
  videos,
  wantsToMeet
) => {
  return new User(
    interests, // array of strings
    aboutMe, // string
    agreedToUserTerms, // boolean
    birthday, // date/timestamp
    drinker, // boolean
    education, // string
    email, // email
    eventsAttended, // array of strings
    eventsInterested, // array of strings
    genderIdentity, // array of strings
    idVerified, // boolean
    jobTitle, // string
    milesWillingToTravel, // number
    parent, // boolean
    phone, // string "###-###-####"
    politicalViews, // array of strings
    profilePhoto, // reference (to firebase storage)
    pronouns, // array of strings
    religiousBeliefs, // array of strings
    sexuality, // array of strings
    sharedPhotos, // array of references (to firebase storage)
    smoker, // boolean
    userType, // array of strings
    username, // string
    videos, // array of references (to firebase storage)
    wantsToMeet // array of strings
  );
};

export default newUser;
