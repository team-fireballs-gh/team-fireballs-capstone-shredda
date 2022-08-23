class Event {
  constructor(
    title,
    startDate,
    address,
    websiteLink,
    location,
    attendees,
    authorID,
    avgRating,
    description,
    endDate,
    photo,
    priceRange,
    reviews,
    type
  ) {
    this.address = address;
    this.attendees = attendees;
    this.authorID = authorID;
    this.avgRating = avgRating;
    this.description = description;
    this.endDate = endDate;
    this.location = location;
    this.photo = photo;
    this.priceRange = priceRange;
    this.reviews = reviews;
    this.startDate = startDate;
    this.title = title;
    this.type = type;
    this.websiteLink = websiteLink;
  }
}

const newEvent = (
  authorID,
  title,
  startDate,
  address,
  websiteLink,
  location,
  attendees,
  avgRating,
  description,
  endDate,
  photo,
  priceRange,
  reviews,
  type
) => {
  return new Event(
    authorID, // string
    title, // string
    startDate, // timestamp
    address, // string
    websiteLink, // string
    location, // geotag
    attendees, // array of strings
    avgRating, // number
    description, // string
    endDate, // timestamp
    photo, // reference (in firebase storage)
    priceRange, // string ($, $$, $$$)
    reviews, // array of strings
    type // array of strings
  );
};

export default newEvent;
