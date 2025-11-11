//for database reference use
export default class PastEvent{
  constructor(flyer, title, subtitle, description, artists, place){
    this.flyer = flyer;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.artists = [/*artist*/]; //artists is it's own resolution table, found by joinin on id
    this.place = place;
  }
}