class Event {
  constructor(
    address,
    attendees,
    authorID,
    avgRating,
    description,
    endDate,
    location,
    photo,
    priceRange,
    reviews,
    startDate,
    title,
    type,
    websiteLink
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
  address,
  attendees,
  authorID,
  avgRating,
  description,
  endDate,
  location,
  photo,
  priceRange,
  reviews,
  startDate,
  title,
  type,
  websiteLink
) => {
  return new Event(
    address, // string
    attendees, // array of strings
    authorID, // string
    avgRating, // number
    description, // string
    endDate, // timestamp
    location, // geotag
    photo, // reference (in firebase storage)
    priceRange, // string ($, $$, $$$)
    reviews, // array of strings
    startDate, // timestamp
    title, // string
    type, // array of strings
    websiteLink // strings
  );
};

export default newEvent;
