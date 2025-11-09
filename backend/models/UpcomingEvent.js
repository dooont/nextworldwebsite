//this is for reference use of the db
export default class UpcomingEvent{
  constructor(image, title, subtitle, url){
    this.image = image, //in db this is stored as flyer_url
    this.title = title,
    this.subtitle = subtitle,
    this.url = url
  }
}