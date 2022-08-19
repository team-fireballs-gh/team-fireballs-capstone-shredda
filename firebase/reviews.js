class Reviews {
  constructor(authorID, content, date, eventID, rating) {
    this.authorID = authorID; // string
    this.content = content; // string
    this.date = date; // timestamp
    this.eventID = eventID; // string
    this.rating = rating; // number
  }
}

const newReview = (authorID, content, date, eventID, rating) => {
  return new Reviews(authorID, content, date, eventID, rating);
};

export default newReview;
