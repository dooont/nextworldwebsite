//for database reference
export default class Member{
  constructor(name, role, photo, description, fun_fact, type){
    this.name = name; //database has first_name and last_name column //recieveDTO is firstName lastName //sendDTO is name
    this.role = role,
    this.photo = photo,
    this.description = description, //sendDTO is desc
    this.fun_fact = fun_fact,
    this.type = type
  }
}